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
    public users: [];

    constructor(serverId: string, config: Config) {
        this.serverId = serverId;
        this.config = config;
        this.users = [];

        const serverConfig = this.config.servers[this.serverId];
        const port = serverConfig ? serverConfig.port : this.config.port;

        console.log("[Melon] Server '" + this.serverId + "' starting on port " + port);

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
        console.log("[Melon] New connection: " + socket.id);
    }

    close(user: any) {
        delete this.users[user.socket.id];
    }

    error(error: any) {
        console.error(`[Melon](${this.serverId}) ERROR: ${error.stack}`)
    }

}