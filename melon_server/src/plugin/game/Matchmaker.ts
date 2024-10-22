import Match from "../../object/match/Match";
import QueuedMatch from "../../object/match/QueuedMatch";
import User from "../../object/user/User";
import GameServer from "../../server/impl/GameServer";
import Plugin from "../Plugin";

export default class MatchMaker extends Plugin {

    private gameServer: GameServer;

    constructor(server: GameServer) {
        super(server);

        this.gameServer = server;

        this.events = {
            'queueMatch': this.queueMatch,
            'readyQueue': this.readyQueue
        }
    }

    async queueMatch(args: any, user: User) {
        if (user.isQueued || user.isInMatch) {
            return;
        }

        this.parseMatch(args, user);
    }

    parseMatch(args: any, user: User) {
        if (args.match === undefined) {
            user.send('error', { message: 'Invalid match details!' });
            return;
        }

        user.isQueued = true;
        
        const queueSize = this.gameServer.queuedMatches.length;

        if (queueSize >= 1) {
            this.joinQueuedMatch(user);
            return;
        }

        const queuedMatch = new QueuedMatch(queueSize + 1, user, null);

        this.gameServer.queuedMatches.push(queuedMatch);

        user.send('message', { message: 'Match queued started...' });
    }

    async joinQueuedMatch(user: User) {
        const random = Math.floor(Math.random() * this.gameServer.queuedMatches.length);

        const queuedMatch = this.gameServer.queuedMatches[random];
    
        if (queuedMatch) {
            const newQueuedMatch = new QueuedMatch(queuedMatch.id, queuedMatch.user1, user);

            this.gameServer.queuedMatches[random] = newQueuedMatch;

            user.isQueued = true;

            user.send('queueStarted', { message: 'You joined a queue, ready up!' });
            queuedMatch.user1?.send('message', { message: user.username + ' joined the queue!' });

            const ready = await this.gameServer.queuedMatches[random].waitForReady(queuedMatch.user1Ready, newQueuedMatch.user2Ready);

            if (!ready) {
              this.gameServer.queuedMatches[random].sendBoth('matchFailed', { message: 'Someone didn\'t ready up! Queue up again!' });
            }
        }
    }

    startMatch(queuedMatch: QueuedMatch, callback: () => void) {
        const matchSize = this.gameServer.matches.length;

        if (queuedMatch.user1 === null || queuedMatch.user2 === null) {
            queuedMatch.sendBoth('matchFailed', { message: 'Match failed! Queue up again!' });
            callback();
            return;
        }

        queuedMatch.user1.isQueued = false;
        queuedMatch.user2.isQueued = false;

        queuedMatch.user1.isInMatch = true;
        queuedMatch.user2.isInMatch = true;

        const newMatch = new Match(matchSize + 1, queuedMatch.user1, queuedMatch.user2);

        this.gameServer.matches.push(newMatch);

        newMatch.broadcast('matchStarted', { message: 'Match has started!' });

        callback();
    }

    async readyQueue(args: any, user: User) {
        if (user.isInMatch) {
            return;
        }

        const queuedMatchIndex = this.gameServer.queuedMatches.findIndex((match) => {
            return match.user1 === user || match.user2 === user;
        });
    
        const queuedMatch = this.gameServer.queuedMatches[queuedMatchIndex];

        if (queuedMatchIndex === -1) {
            return;
        }
    
        if (queuedMatch.user1 === user) {
            queuedMatch.user1Ready = true;
        } else {
            queuedMatch.user2Ready = true;
        }
    
        this.gameServer.queuedMatches[queuedMatchIndex] = queuedMatch;
    
        if (queuedMatch.user1Ready && queuedMatch.user2Ready) {
            queuedMatch.sendBoth('matchSuccess', { message: 'Match is about to begin' });
    
            if (queuedMatch.user1 !== null) {
                queuedMatch.user1.isQueued = false;
            }
    
            if (queuedMatch.user2 !== null) {
                queuedMatch.user2.isQueued = false;
            }
    
            this.startMatch(queuedMatch, () => {
              // delete it from memory
              if (this.gameServer.getIndexFromUserInQueue(user) !== null) {
                this.gameServer.queuedMatches.splice(this.gameServer.getIndexFromUserInQueue(user), 1);
              }
            });
        }
    }

}