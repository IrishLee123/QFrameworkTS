import { AbstractCommand } from "../../../QFramework/Architecture/ICommand";
import { IGameModel } from "../Model/GameModel";
import { PointGameClassKey } from "../PointGameApp";

export class EnemyAttackCommand extends AbstractCommand {

    protected OnExecute(): void {
        this.GetModel<IGameModel>(PointGameClassKey.GameModel).hp.value -= 1;
    }
} 