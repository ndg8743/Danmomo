import config from '../config/config.json';
import Server from './server/Server';

let args = process.argv.slice(2);

for (let server of args) {
    if (server in config.servers) {
        new Server(server, config);
    }
}