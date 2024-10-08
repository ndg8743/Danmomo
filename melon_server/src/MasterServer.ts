import config from '../config/config.json';
import GameHandler from './handler/GameHandler';

import Server from './object/server/Server';


class MasterServer extends Server {

    constructor() {
        super('master', config, new GameHandler('game', [], config));
    }

}

new MasterServer();