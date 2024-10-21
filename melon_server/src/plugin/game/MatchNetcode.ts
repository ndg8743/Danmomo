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

        const otherUser = match.user1 === user ? match.user2 : match.user1;

        if (args.type === 'fruit') {
          this.handleFruit(args, otherUser);
        } else if (args.type === 'bomb') {
          this.handleBomb(args, otherUser);
        }
    }

    handleFruit(args: any, user: User) {
        // TODO: finish
        
        if (args.x === undefined || args.y === undefined) {
            // invalid positions
            return;
        }

        user.send('recieveGameData', { type: "fruit", x: args.x, y: args.y });
    }

    handleBomb(args: any, user: User) {
        // TODO

        if (args.x === undefined || args.y === undefined) {
            // invalid positions
            return;
        }

        user.send('recieveGameData', { type: "bomb", x: args.x, y: args.y });
    }

}