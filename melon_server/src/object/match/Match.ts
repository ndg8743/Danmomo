import User from "../user/User";

export default class Match {
    
    public id: number;
    public user1: User;
    public user2: User;
    private subscribers: User[] = [];

    constructor(id: number, user1: User, user2: User) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.subscribers.push(user1, user2);
    }

    broadcast(action: string, args?: object) {
        this.subscribers.forEach((user) => {
          user.send(action, args);
        });
    }
    
    handleGameStateUpdate(user: User, message: any) {
        this.broadcast('gameStateUpdate', message);
    }
    
}