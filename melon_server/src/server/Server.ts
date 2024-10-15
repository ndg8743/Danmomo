import { Socket } from 'socket.io';
import * as http from 'http';
import { Config } from '../object/Config';
import EventEmitter from "events";
import PluginManager from "../plugin/PluginManager";
import User from '../object/user/User';

export default class Server {

    public serverId: string;
    public config: Config;
    public plugins?: PluginManager;
    public events: EventEmitter;
    public users: { [key: string]: User };

    constructor(serverId: string, config: Config) {
        this.serverId = serverId;
        this.config = config;
        this.users = {};

        const serverConfig = this.config.servers[this.serverId];
        const port = serverConfig ? serverConfig.port : this.config.port;
        const address = '127.0.0.1';

        console.log("[Melon] Server '" + this.serverId + "' - " + address + ":" + port);

        const io = this.createSocket({
            cors: {
                origin: '*'
            }
        });

        const server = io.listen(port);

        this.events = new EventEmitter({ captureRejections: true });

        server.on('connection_error', (error: Error) => { 
            console.error("[Melon] Connection error: ", error) 
        });

        this.startPlugins(this.serverId);

        server.on('connection', (socket: Socket) => {
            this.onConnection(socket);
        });

        this.events.on('error', (error: Error) => {
            this.error(error);
        });
    }

    startPlugins(directory: string) {
        this.plugins = new PluginManager(this, directory);
    }

    handle(message: { action: string, args: [] }, user: User) {
        try {
            console.log(`[Melon](${this.serverId}) Received: ${message.action} ${JSON.stringify(message.args)}`);

            this.events.emit(message.action, message.args, user);

            if (user.events) {
                user.events.emit(message.action, message.args, user);
            }
        } catch (error) {
            this.error(error);
        }
    }

    createSocket(options: any) {
        const server = http.createServer((req, res) => {});

        return require('socket.io')(server, options);
    }

    onConnection(socket: Socket) {
        this.setupUser(socket);
    }

    setupUser(socket: Socket) {
        const user = new User(this, socket);

        this.users[socket.id] = user;

        console.log("[Melon](" + this.serverId + ") New connection: " + socket.id);

        socket.on('message', (message) => this.onMessage(message, user));
        socket.on('disconnect', () => this.onDisconnect(user));
    }

    onMessage(message: { action: string, args: [] }, user: User) {
        if (typeof message === 'string') {
            try {
                message = JSON.parse(message);
            } catch (error) {
                console.error("[Melon] Failed to parse message: ", error);
                return;
            }
        }

        //console.log(`[Melon](${this.serverId}) Full message received: ${JSON.stringify(message)}`);
        this.handle(message, user);
    }

    onDisconnect(user: User) {
        console.log(`[Melon](${this.serverId}) Disconnect from: ${user.socket.id}`);

        this.close(user);
    }

    close(user: any) {
        delete this.users[user.socket.id];
    }

    error(error: any) {
        console.error(`[Melon](${this.serverId}) ERROR: ${error.stack}`)
    }

}