import { Config } from "../object/Config";
import EventEmitter from "events";
import PluginManager from "../plugin/PluginManager";

export default class BaseHandler {
    
    public handlerId: string;
    public users: [];
    public config: Config;
    public plugins?: PluginManager;
    public events: EventEmitter;
    public logging: boolean;

    constructor(handlerId: string, users: [], config: Config) {
        this.handlerId = handlerId;
        this.users = users;
        this.config = config;

        this.events = new EventEmitter({ captureRejections: true });
        this.logging = config.logging;

        this.startPlugins(handlerId);

        this.events.on('error', (error: Error) => {
            this.error(error);
        })
    }

    startPlugins(directory: string) {
        this.plugins = new PluginManager(this, directory);
    }

    // TODO: fix user typing
    handle(message: { action: string, args: [] }, user: any) {
        try {
            if (this.logging) {
                console.log(`[Melon](${this.handlerId}) Received: ${message.action} ${JSON.stringify(message.args)}`);
            }

            this.events.emit(message.action, message.args, user);

            if (user.events) {
                user.events.emit(message.action, message.args, user);
            }
        } catch (error) {
            this.error(error);
        }
    }

    close(user: any) {
        delete this.users[user.socket.id];
    }

    error(error: any) {
        console.error(`[Melon](${this.handlerId}) ERROR: ${error.stack}`)
    }

}