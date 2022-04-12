import { AbstractQuery } from "../../../QFramework/Architecture/IQuery";
import { GameModel } from "../Model/GameModel";

export class GetScoreQuery extends AbstractQuery<number>{

    protected OnDo(): number {
        return this.GetModel(GameModel).score.value;
    }

}