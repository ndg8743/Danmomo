import { Config } from '../config/Config';

export default class Server {

    public serverId: string;
    public config: Config;

    constructor(serverId: string, config: Config) {
        this.serverId = serverId;
        this.config = config;
    }

}