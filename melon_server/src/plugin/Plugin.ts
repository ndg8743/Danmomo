import Server from "../server/Server";
import User from "../object/user/User";

interface PluginEvents {
    [key: string]: (...args: any[]) => void;
}

export default class Plugin {

    public server: Server;
    public users: { [key: string]: User };
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