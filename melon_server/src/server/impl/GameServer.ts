import { Config } from "../../object/Config";
import Match from "../../object/match/Match";
import Server from "../Server";
import QueuedMatch from '../../object/match/QueuedMatch';

export default class GameServer extends Server {

    public queuedMatches: QueuedMatch[];
    public matches: Match[];

    constructor(serverId: string, config: Config) {
        super(serverId, config);

        this.queuedMatches = [];
        this.matches = [];
    }

}