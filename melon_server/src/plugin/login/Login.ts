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
        console.log("login plugin says hi to " + user.socket.id + " they sent " + args.helloWorld);
    }

}