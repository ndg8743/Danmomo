import { Socket } from 'socket.io';
import * as http from 'http';
import { Config } from '../object/Config';

export default class Server {

    public serverId: string;
    public config: Config;

    constructor(serverId: string, config: Config) {
        this.serverId = serverId;
        this.config = config;

        const port = config.port;

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