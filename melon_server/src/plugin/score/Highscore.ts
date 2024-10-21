import Plugin from "../Plugin";
import User from "../../object/user/User";
import Server from "../../server/Server";

export default class Highscore extends Plugin {

    constructor(server: Server) {
        super(server);

        this.events = {
            'submitHighscore': this.submitHighscore
        }
    }

    async submitHighscore(args: any, user: User) {
        // TODO
    }

}