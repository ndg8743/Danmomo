import Plugin from "../Plugin";
import User from "../../object/user/User";
import Server from "../../server/Server";

export default class MatchNetcode extends Plugin {
    
    constructor(server: Server) {
        super(server);

        this.events = {
            'sendGameData': this.sendGameData
        }
    }

    async sendGameData(args: any, user: User) {
        // TODO
    }

    handleFruit() {
        // TODO
    }

    handleBomb() {
        // TODO
    }

}