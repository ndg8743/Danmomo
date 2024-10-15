import { EventEmitter } from "events";
import Server from "../server/Server";

interface PluginEvents {
    [key: string]: (...args: any[]) => void;
}

export default class Plugin {

    public server: Server;
    public users: [];
    public events: PluginEvents
    public config: {};

    constructor(server: Server) {
        this.server = server;
        this.users = server.users;
        this.events = {};
        this.config = server.config;
    }

    get plugins() {
        return this.server.plugins?.plugins;
    }

}