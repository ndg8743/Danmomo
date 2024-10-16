import User from "../user/User";

export default class QueuedMatch {

    public id: number;
    public user1: User | null;
    public user2: User | null;
    public user1Ready: boolean;
    public user2Ready: boolean;

    constructor(id: number, user1: User | null, user2: User | null) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.user1Ready = false;
        this.user2Ready = false;
    }

    async waitForReady(user1Ready: boolean, user2Ready: boolean) {
        await new Promise((resolve) => setTimeout(resolve, 15000));
        
        return !(user1Ready && user2Ready);
    }

    sendBoth(action: string, args?: object) {
        this.user1?.send(action, args);
        this.user2?.send(action, args);
    }

    messageBoth(message: string) {
        this.sendBoth('message', { message });
    }

}