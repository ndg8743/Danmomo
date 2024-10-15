import Score from "../score/Score";

export default class UserData {

    public highscore: Score | null;
    public scores: Score[];

    constructor(highscore: Score | null, scores: Score[]) {
        this.highscore = highscore;
        this.scores = scores;
    }

}