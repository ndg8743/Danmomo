import Server from "../../server/Server";
import { Socket } from "socket.io";
import UserData from './UserData';
import EventEmitter from "events";

export default class User {

    public server: Server;
    public socket: Socket;
    public userData: UserData;
    public events: EventEmitter;

    public username: string;
    public isGuest: boolean;

    public isQueued: boolean;
    public isInMatch: boolean;

    constructor(server: Server, socket: Socket) {
        this.server = server;
        this.socket = socket;
        this.userData = new UserData(null, []);
        this.events = new EventEmitter({ captureRejections: true });

        this.username = 'Guest';
        this.isGuest = true;

        this.isQueued = false;
        this.isInMatch = false;
    }

    load(username: string) {
        // TODO: load from db
        // TODO: set userdata from db
    }

    save() {
        // TODO: save to db
    }

    send(action: string, args?: object) {
        this.socket.emit('message', { action, args });
    }

    close() {
        this.socket.disconnect();
    }

}