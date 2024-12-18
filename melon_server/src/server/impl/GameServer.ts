import { Config } from "../../object/Config";
import Match from "../../object/match/Match";
import Server from "../Server";
import QueuedMatch from '../../object/match/QueuedMatch';
import User from "../../object/user/User";
import Score from "../../object/score/Score";

export default class GameServer extends Server {

    public queuedMatches: QueuedMatch[];
    public matches: Match[];

    public singleScores: Score[];
    public multiScores: Score[];

    constructor(serverId: string, config: Config) {
        super(serverId, config);

        this.queuedMatches = [];
        this.matches = [];

        this.singleScores = [];
        this.multiScores = [];
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

    removeMatch(match: Match) {
        const index = this.matches.indexOf(match);

        if (index !== -1) {
            this.matches.splice(index, 1);
            console.log(`[GameServer] Match removed between ${match.user1.socketUrl} and ${match.user2.socketUrl}`);
        }
    }

    onDisconnect(user: User) {
        console.log(`[GameServer](${this.serverId}) Disconnect from: ${user.socketUrl}`);

        const match = this.getMatchFromUser(user);

        if (match) {
            this.removeMatch(match);
        }

        const queuedMatch = this.getMatchFromUserInQueue(user);

        if (queuedMatch) {
            console.log(`[GameServer](${this.serverId}) User ${user.socketUrl} was in a queued match.`);
        }

        super.onDisconnect(user);
    }

}