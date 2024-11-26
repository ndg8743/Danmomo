import Server from "../../server/Server";
import { Socket } from "../../object/socket/Socket";
import UserData from './UserData';
import EventEmitter from "events";
import { v4 as uuidv4 } from 'uuid';

export default class User {

    public server: Server;
    public socket: Socket;
    public userData: UserData;
    public events: EventEmitter;

    public socketUrl: string;

    public username: string;
    public isGuest: boolean;

    public isQueued: boolean;
    public isInMatch: boolean;

    public id: string;

    constructor(server: Server, socket: Socket) {
        this.server = server;
        this.socket = socket;
        this.userData = new UserData(null, []);
        this.events = new EventEmitter({ captureRejections: true });

        this.socketUrl = 'unknown';

        this.username = 'Guest';
        this.isGuest = true;

        this.isQueued = false;
        this.isInMatch = false;
        
        this.id = uuidv4();
    }

    load(username: string) {
        // TODO: load from db
        // TODO: set userdata from db
    }

    save() {
        // TODO: save to db
    }

    send(action: string, args?: object) {
        const message = JSON.stringify({ action, args });

        this.socket.send(message);
    }

    close() {
        this.socket.close();
    }

}