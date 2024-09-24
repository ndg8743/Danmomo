import config from '../config/config.json';

import Server from './server/Server';

class MasterServer extends Server {

    constructor() {
        super('master', config);

        const restPort = config.restPort;
        const socketPort = config.socketPort;

        console.log("[Melon] Server '" + this.serverId + "' starting on REST port " + restPort + " socket port " + socketPort);
    }

}

new MasterServer();