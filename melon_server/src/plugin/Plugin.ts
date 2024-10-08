import { EventEmitter } from "events";
import BaseHandler from "../handler/BaseHandler";

interface PluginEvents {
    [key: string]: (...args: any[]) => void;
}

export default class Plugin {

    public handler: BaseHandler;
    public users: [];
    public events: PluginEvents
    public config: {};

    constructor(handler: BaseHandler) {
        this.handler = handler;
        this.users = handler.users;
        this.events = {};
        this.config = handler.config;
    }

    get plugins() {
        return this.handler.plugins?.plugins;
    }

}