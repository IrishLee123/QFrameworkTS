import { AbstractCommand } from "../../../QFramework/Architecture/ICommand";
import { GameModel, IGameModel } from "../Model/GameModel";

export class EnemyAttackCommand extends AbstractCommand {

    protected OnExecute(): void {
        this.GetModel<IGameModel>(GameModel).hp.value -= 1;
    }
} 