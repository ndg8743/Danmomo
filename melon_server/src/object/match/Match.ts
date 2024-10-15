import User from "../user/User";

export default class Match {
    
    public id: number;
    public user1: User;
    public user2: User;

    constructor(id: number, user1: User, user2: User) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
    }
}