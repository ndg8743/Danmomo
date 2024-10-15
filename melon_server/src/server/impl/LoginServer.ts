import { Config } from "../../object/Config";
import Server from "../Server";

export default class LoginServer extends Server {

    constructor(serverId: string, config: Config) {
        super(serverId, config);
    }

}