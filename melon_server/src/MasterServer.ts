import config from '../config/config.json';

import Server from './server/Server';
import { Config } from './config/Config';
import * as http from 'http';
import { Socket } from 'socket.io';

class MasterServer extends Server {

    constructor() {
        super('master', config);

        const restPort = config.restPort;
        const socketPort = config.socketPort;

        console.log("[Melon] Server '" + this.serverId + "' starting on REST port " + restPort + " socket port " + socketPort);

        const io = this.createSocket(config, {
            cors: {
                origin: '*'
            }
        });

        const server = io.listen(socketPort);

        server.on('connection_error', (error: Error) => { 
            console.error("[Melon] Connection error: ", error) 
        });

        server.on('connection', (socket: Socket) => {
            this.onConnection(socket);
        });
    }

    createSocket(config: Config, options: any) {
        const server = http.createServer((req, res) => {});

        return require('socket.io')(server, options);
    }

    onConnection(socket: Socket) {
        console.log("[Melon] New connection: " + socket.id);
    }

}

new MasterServer();