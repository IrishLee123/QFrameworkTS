import { AbstractCommand } from "../../../QFramework/Architecture/ICommand";
import { GameModel, IGameModel } from "../Model/GameModel";

export class KillEnemyCommand extends AbstractCommand {

    protected OnExecute(): void {

        this.GetModel<IGameModel>(GameModel).score.value += 1;

    }
}