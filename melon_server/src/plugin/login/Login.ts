import User from "../../object/user/User";
import Server from "../../server/Server";
import Plugin from "../Plugin";

export default class Login extends Plugin {

    constructor(server: Server) {
        super(server);

        this.events = {
            'login': this.login
        }
    }

    async login(args: any, user: User) {
        if (args.guest !== undefined) {
            user.send('login', { success: true, message: 'Logged in as Guest' });
            console.log(`[Melon](${this.server.serverId}) Guest login: ${user.socket.url}`);

            return;
        }

        if ((args.username === undefined || args.password === undefined) && args.guest === undefined) {
            user.send('error', { message: 'Missing username or password!' });
            return;
        }

        await this.verify(args.username, args.password, user);
    }

    async verify(username: string, password: string, user: User) {
        if (username === 'admin' && password === 'admin') {

            user.username = 'admin';
            user.isGuest = false;

            user.send('login', { success: true, message: 'Logged in as Admin' });

            return true;
        } else {
            return false;
        }
    }

}