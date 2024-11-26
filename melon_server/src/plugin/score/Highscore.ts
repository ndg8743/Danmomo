import Plugin from "../Plugin";
import User from "../../object/user/User";
import Server from "../../server/Server";
import Score from "../../object/score/Score";
import GameServer from "../../server/impl/GameServer";

export default class Highscore extends Plugin {

    private gameServer: GameServer;

    constructor(server: GameServer) {
        super(server);

        this.gameServer = server;

        this.events = {
            'submitHighscoreSP': this.submitHighscoreSp,
            'submitHighscoreMP': this.submitHighscoreMp
        }
    }

    async submitHighscoreSp(args: any, user: User) {
        if (args.score === undefined) {
            return;
        }

        const scoreValue = args.score;
        const score = new Score(user.id, scoreValue, new Date());

        // Check if this score is higher than the user's previous score
        const existingScore = this.gameServer.singleScores.find(s => s.id === user.id);

        if (existingScore) {
            // If the new score is higher, replace the old score
            if (score.score > existingScore.score) {
                existingScore.score = score.score;
                existingScore.date = score.date;
            }
        } else {
            // If no existing score, add the new score
            this.gameServer.singleScores.push(score);
        }

        // Sort scores in descending order (highest score first)
        this.gameServer.singleScores.sort((a, b) => b.score - a.score);

        console.log(`Highscore submitted for ${user.socketUrl}: ${score.score}`);
    }

    async submitHighscoreMp(args: any, user: User) {
        if (args.score === undefined) {
            return;
        }

        const scoreValue = args.score;
        const score = new Score(user.id, scoreValue, new Date());

        // Check if this score is higher than the user's previous score
        const existingScore = this.gameServer.multiScores.find(s => s.id === user.id);

        if (existingScore) {
            // If the new score is higher, replace the old score
            if (score.score > existingScore.score) {
                existingScore.score = score.score;
                existingScore.date = score.date;
            }
        } else {
            // If no existing score, add the new score
            this.gameServer.multiScores.push(score);
        }

        // Sort scores in descending order (highest score first)
        this.gameServer.multiScores.sort((a, b) => b.score - a.score);

        console.log(`Highscore submitted for ${user.socketUrl}: ${score.score}`);
    }

}