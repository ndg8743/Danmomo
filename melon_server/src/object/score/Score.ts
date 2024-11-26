export default class Score {

    public id: string;
    public score: number;
    public date: Date;

    constructor(id: string, score: number, date: Date) {
        this.id = id;
        this.score = score;
        this.date = date;
    }

}