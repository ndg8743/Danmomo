import { Config } from "../../object/Config";
import Server from "../Server";

export default class ScoreServer extends Server {

    constructor(serverId: string, config: Config) {
        super(serverId, config);
    }

}