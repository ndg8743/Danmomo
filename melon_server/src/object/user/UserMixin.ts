import { Server as SocketIOServer, Socket } from 'socket.io';
import Server from '../server/Server';
import { Config } from '../Config';
import BaseHandler from '../../handler/BaseHandler';

interface Context {

    server: Server;
    socket: Socket;
    handler: BaseHandler;
    config: Config;
    id?: string;
    username?: string;
    init(server: Server, socket: Socket): void;
    send(action: string, args?: object): void;
    close(): void;
    getId(): string;
    load(username: string): Promise<boolean>;
    
}

const context: Context = {

    server: {} as Server,
    socket: {} as Socket,
    handler: {} as BaseHandler,
    config: {} as Config,

    init(server: Server, socket: Socket) {
        this.server = server;
        this.socket = socket;
        this.handler = server.handler;
        this.config = server.config;
    },

    send(action: string, args?: object) {
        this.socket.emit('message', { action, args });
    },

    close() {
        this.socket.disconnect();
    },
    getId() {
        return this.id ? this.id : this.socket.id;
    },
    async load(username: string): Promise<boolean> {
        try {
/*             await this.reload({
                where: {
                    username
                }
            }); */

            return true;
        } catch (error) {
            return false;
        }
    }

}

export default context;