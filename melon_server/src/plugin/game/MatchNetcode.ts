import Plugin from "../Plugin";
import User from "../../object/user/User";
import GameServer from "../../server/impl/GameServer";

export default class MatchNetcode extends Plugin {

    private gameServer: GameServer;
    
    constructor(server: GameServer) {
        super(server);

        this.gameServer = server;

        this.events = {
            'sendGameData': this.sendGameData
        }
    }

    async sendGameData(args: any, user: User) {
        if (!user.isInMatch) {
            return;
        }

        const match = this.gameServer.getMatchFromUser(user);

        if (!match) {
            return;
        }

        // TODO: format this correctly
        if (match.user1 !== user) {

            // TODO

        } else if (match.user2 !== user) {

            // TODO

        } else {
            return;
        }
    }

    handleFruit() {
        // TODO
    }

    handleBomb() {
        // TODO
    }

}