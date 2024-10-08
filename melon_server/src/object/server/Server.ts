import { Config } from '../Config';
import { Socket } from 'socket.io';
import * as http from 'http';
import BaseHandler from '../../handler/BaseHandler';

export default class Server {

    public serverId: string;
    public config: Config;
    public handler: BaseHandler;

    constructor(serverId: string, config: Config, handler: BaseHandler) {
        this.serverId = serverId;
        this.config = config;
        this.handler = handler;

        const serverConfig = this.config.servers[this.serverId];
        const port = serverConfig ? serverConfig.port : this.config.port;

        console.log("[Melon] Server '" + this.serverId + "' starting on port " + port);

        const io = this.createSocket({
            cors: {
                origin: '*'
            }
        });

        const server = io.listen(port);

        server.on('connection_error', (error: Error) => { 
            console.error("[Melon] Connection error: ", error) 
        });

        server.on('connection', (socket: Socket) => {
            this.onConnection(socket);
        });

    }

    createSocket(options: any) {
        const server = http.createServer((req, res) => {});

        return require('socket.io')(server, options);
    }

    onConnection(socket: Socket) {
        console.log("[Melon] New connection: " + socket.id);
    }

}