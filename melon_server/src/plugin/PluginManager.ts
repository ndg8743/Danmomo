import EventEmitter from "events";
import BaseHandler from "../handler/BaseHandler";
import fs from 'fs';
import path from 'path';
import Plugin from "./Plugin";

export default class PluginManager {

    public events: EventEmitter;
    public directory: string;
    public plugins: { [key: string]: any } = {};

    constructor(handler: BaseHandler, pluginDirectory: string) {
        this.events = handler.events;
        this.directory = `${__dirname}/${pluginDirectory}`;
        this.plugins = [];

        console.log("[Melon] Plugin directory: " + this.directory);
    }

    loadPlugins(handler: BaseHandler) {
        const pluginFiles = fs.readdirSync(this.directory).filter(file => {
            return path.extname(file) === '.ts';
        });

        for (let plugin of pluginFiles) {
            const pluginImport = require(path.join(this.directory, plugin)).default;
            const pluginInstance = new pluginImport(handler);

            this.plugins[plugin.replace('.ts', '').toLowerCase()] = pluginInstance;

            this.loadEvents(pluginInstance);
        }

        const pluginCount = Object.keys(this.plugins).length;
        const eventCount = this.events.eventNames().reduce((acc, eventName) => {
            return acc + this.events.listenerCount(eventName);
        }, 0);

        console.log("[Melon] Loaded " + pluginCount + " plugins and " + eventCount + " events");
    }

    loadEvents(plugin: Plugin) {
        for (let event in plugin.events) {
            if (plugin.events.hasOwnProperty(event)) {
                this.events.on(event, plugin.events[event].bind(plugin));
            }
        }
    }
    
}