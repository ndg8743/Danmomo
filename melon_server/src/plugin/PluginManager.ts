import EventEmitter from "events";
import fs from 'fs';
import path from 'path';
import Plugin from "./Plugin";
import Server from "../server/Server";

export default class PluginManager {

    public events: EventEmitter;
    public directory: string;
    public plugins: { [key: string]: any } = {};

    constructor(server: Server, pluginDirectory: string) {
        this.events = server.events;
        this.directory = path.join(__dirname, pluginDirectory);
        this.plugins = [];

        //console.log("[Melon] Plugin directory: " + this.directory);

        this.loadPlugins(server);
    }

    loadPlugins(server: Server) {
        const pluginFiles = fs.readdirSync(this.directory).filter(file => {
            return path.extname(file) === '.ts';
        });

        for (const pluginFile of pluginFiles) {
            try {
                const pluginImport = require(path.join(this.directory, pluginFile));
                
                const pluginClass = pluginImport.default || pluginImport;
                
                if (typeof pluginClass === 'function') {
                    const pluginInstance = new pluginClass(server);
                    this.plugins[pluginFile.replace('.ts', '').toLowerCase()] = pluginInstance;
                    
                    this.loadEvents(pluginInstance);
                } else {
                    console.error(`[Melon] Failed to load plugin: ${pluginFile}. It doesn't export a constructor.`);
                }
            } catch (err) {
                console.error(`[Melon] Error loading plugin ${pluginFile}:`, err);
            }
        }

        const pluginCount = Object.keys(this.plugins).length;
        const eventCount = this.events.eventNames().length;

        console.log(`[Melon] (${server.serverId}) Loaded ${pluginCount} plugins and ${eventCount} events`);
    }

    loadEvents(plugin: Plugin) {
        for (let event in plugin.events) {
            if (plugin.events.hasOwnProperty(event)) {
                this.events.on(event, plugin.events[event].bind(plugin));
            }
        }
    }
    
}