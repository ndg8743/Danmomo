import QueuedMatch from "../../object/match/QueuedMatch";
import User from "../../object/user/User";
import GameServer from "../../server/impl/GameServer";
import Server from "../../server/Server";
import Plugin from "../Plugin";

export default class MatchMaker extends Plugin {

    private gameServer: GameServer;

    constructor(server: GameServer) {
        super(server);

        this.gameServer = server;

        this.events = {
            'queueMatch': this.queueMatch
        }
    }

    async queueMatch(args: any, user: User) {
        this.parseMatch(args, user);

        user.send('message', { message: 'Match queued started...' });
    }

    parseMatch(args: any, user: User) {
        if (args.match === undefined) {
            user.send('error', { message: 'Invalid match details!' });
            return;
        }
        
        const queueSize = this.gameServer.queuedMatches.length;

        if (queueSize > 1) {

        }

        const newMatch = new QueuedMatch(queueSize + 1, user, null);

        this.gameServer.queuedMatches.push(newMatch);
    }

    startMatch() {
        
    }

}