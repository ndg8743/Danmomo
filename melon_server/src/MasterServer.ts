import config from '../config/config.json';
import LoginServer from './server/impl/LoginServer';
import GameServer from './server/impl/GameServer';
import ScoreServer from './server/impl/ScoreServer';

let args = process.argv.slice(2);

for (let server of args) {
    if (server in config.servers) {
        switch (server) {
            case 'login':
                new LoginServer(server, config);
                break;
            case 'game':
                new GameServer(server, config);
                break;
            case 'score':
                new ScoreServer(server, config);
                break;
            default:
                console.log(`[Melon] Unknown server type: ${server}`);
        }
    }
}