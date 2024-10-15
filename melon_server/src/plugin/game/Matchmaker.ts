import User from "../../object/user/User";
import Server from "../../server/Server";
import Plugin from "../Plugin";

export default class MatchMaker extends Plugin {

    constructor(server: Server) {
        super(server);

        this.events = {
            'queueMatch': this.queueMatch
        }
    }

    async queueMatch(args: any, user: User) {
        
        

    }

    parseMatch(args: any, user: User) {
        if (args.match === undefined) {
            user.send('error', { message: 'Invalid match details!' });
            return;
        }

    }

}