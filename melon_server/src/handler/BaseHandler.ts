import { Config } from "../object/Config";
import EventEmitter from "events";
import PluginManager from "../plugin/PluginManager";

export default class BaseHandler {
    
    public handlerId: string;
    public users: [];
    public config: Config;
    public plugins?: PluginManager;
    public events: EventEmitter;

    constructor(handlerId: string, users: [], config: Config) {
        this.handlerId = handlerId;
        this.users = users;
        this.config = config;

        this.events = new EventEmitter({ captureRejections: true });

        this.startPlugins(handlerId);

        this.events.on('error', (error: Error) => {
            // TODO: handle errror!
        })
    }

    startPlugins(directory: string) {
        this.plugins = new PluginManager(this, directory);
    }

    handle(message: { action: string, args: [] }, user: any) {

    }

}