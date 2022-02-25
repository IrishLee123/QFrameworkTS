import { AbstractCommand } from "../../../QFramework/Architecture/ICommand";
import { GameEndEvent } from "../Event/Events";
import { EventType } from "../PointGameApp";

export class SettleGameCommand extends AbstractCommand {

    protected OnExecute(): void {
        this.SendEvent<GameEndEvent>(EventType.GameEndEvent);
    }
}