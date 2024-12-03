import { RawData, WebSocket } from 'ws';
import * as http from 'http';
import { Config } from '../object/Config';
import EventEmitter from "events";
import PluginManager from "../plugin/PluginManager";
import User from '../object/user/User';
import { Socket } from '../object/socket/Socket';
import * as fs from 'fs';
import * as https from 'https';

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
        const address = this.config.ip;

        let server;

        if (this.config.secure) { 
            if (!fs.existsSync(process.cwd() + '/private.key') || !fs.existsSync(process.cwd() + '/certificate.crt')) {
                throw new Error('[Melon] Server private.key or certificate.crt not found');
            }
            const sslOptions = {
                key: fs.readFileSync(process.cwd() + '/private.key'),  // Path to your private key
                cert: fs.readFileSync(process.cwd() + '/certificate.crt'), // Path to your certificate
            };

            server = https.createServer(sslOptions);
        } else {
            server = http.createServer();
        }
        
        const wss = new WebSocket.Server({ server });

        server.listen(port, () => {
            console.log(`[Melon] Server '${this.serverId}' listening on ${address}:${port}`);
        });

        this.events = new EventEmitter({ captureRejections: true });

        server.on('connection_error', (error: Error) => { 
            console.error("[Melon] Connection error: ", error) 
        });

        this.startPlugins(this.serverId);

        wss.on('connection', (socket: Socket) => {
            this.onConnection(socket);
        });

        this.events.on('error', (error: Error) => {
            this.error(error);
        });
    }

    private getUniqueID(): string {
        function s4(): string {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    }

    startPlugins(directory: string) {
        this.plugins = new PluginManager(this);
    }

    handle(message: { action: string, args: any[] }, user: User) {
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

    onConnection(socket: Socket) {
        socket.id = this.getUniqueID();

        this.setupUser(socket);
    }

    setupUser(socket: Socket) {
        const user = new User(this, socket);

        this.users[socket.id] = user;

        user.socketUrl = socket.id;

        console.log("[Melon](" + this.serverId + ") New connection: " + socket.id);

        socket.on('message', (message) => this.onMessage(message, user));
        socket.on('close', () => this.onDisconnect(user));
    }

    onMessage(message: RawData, user: User) {
        let parsedMessage: { action: string; args: any };
        let messageStr: string;
    
        if (Buffer.isBuffer(message)) {
            messageStr = message.toString();
        } else if (typeof message === 'string') {
            messageStr = message; 
        } else {
            console.error("[Melon] (" + this.serverId + ") Unsupported message type:", typeof message);
            return;
        }
    
        try {
            parsedMessage = JSON.parse(messageStr); 
        } catch (error) {
            console.error("[Melon] (" + this.serverId + ") Failed to parse message: ", error);
            return;
        }
    
        if (parsedMessage && typeof parsedMessage.action === 'string') {
            if (parsedMessage.args && typeof parsedMessage.args === 'object') {
                this.handle({ action: parsedMessage.action, args: parsedMessage.args }, user);
            } else {
                console.error("[Melon](" + this.serverId + ") Received malformed args: ", parsedMessage.args);
            }
        } else {
            console.error("[Melon](" + this.serverId + ") Received malformed message: ", parsedMessage);
        }
    }

    onDisconnect(user: User) {
        console.log(`[Melon](${this.serverId}) Disconnect from: ${user.socketUrl}`);

        this.close(user);
    }

    close(user: User) {
        delete this.users[user.socket.url];
    }

    error(error: any) {
        console.error(`[Melon](${this.serverId}) ERROR: ${error.stack}`)
    }

}