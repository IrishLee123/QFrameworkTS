import { AbstractCommand } from "../../../QFramework/Architecture/ICommand";
import { IGameModel } from "../Model/GameModel";
import { PointGameClassKey } from "../PointGameApp";

export class KillEnemyCommand extends AbstractCommand {

    protected OnExecute(): void {

        this.GetModel<IGameModel>(PointGameClassKey.GameModel).score.value += 1;

    }
}