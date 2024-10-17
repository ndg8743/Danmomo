import { Config } from "../../object/Config";
import Match from "../../object/match/Match";
import Server from "../Server";
import QueuedMatch from '../../object/match/QueuedMatch';
import User from "../../object/user/User";

export default class GameServer extends Server {

    public queuedMatches: QueuedMatch[];
    public matches: Match[];

    constructor(serverId: string, config: Config) {
        super(serverId, config);

        this.queuedMatches = [];
        this.matches = [];
    }
    
    getMatchFromUserInQueue(user: User): QueuedMatch | null {
        for (const queuedMatch of this.queuedMatches) {
            if (queuedMatch.user1 === user || queuedMatch.user2 === user) {
                return queuedMatch;
            }
        }
        return null;
    }

    getIndexFromUserInQueue(user: User): number {
        for (let i = 0; i < this.queuedMatches.length; i++) {
            if (this.queuedMatches[i].user1 === user || this.queuedMatches[i].user2 === user) {
                return i;
            }
        }
        return -1;
    }

    getMatchFromUser(user: User): Match | null {
        for (const match of this.matches) {
            if (match.user1 === user || match.user2 === user) {
                return match;
            }
        }
        return null;
    }

}