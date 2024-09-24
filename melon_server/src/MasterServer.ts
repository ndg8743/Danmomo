import config from '../config/config.json';

import Server from './server/Server';

class MasterServer extends Server {

    constructor() {
        super('master', config);

        const port = config.port;

        console.log("[Melon] Server '" + this.serverId + "' starting on port " + port);
    }

}

new MasterServer();