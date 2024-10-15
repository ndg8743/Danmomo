export default class Score {

    public id: number;
    public score: number;
    public date: Date;

    constructor(id: number, score: number, date: Date) {
        this.id = id;
        this.score = score;
        this.date = date;
    }

}