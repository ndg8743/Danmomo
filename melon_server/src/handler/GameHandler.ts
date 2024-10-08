import { Config } from "../object/Config";
import BaseHandler from "./BaseHandler";

export default class GameHandler extends BaseHandler {

    constructor(handlerId: string, users: [], config: Config) {
        super(handlerId, users, config);
    }
    
}