import config from '../config/config.json';
import GameServer from './server/impl/GameServer';

let args = process.argv.slice(2);

for (let server of args) {
    if (server in config.servers) {
        new GameServer(server, config);
    }
}