import { AbstractCommand } from "../../../QFramework/Architecture/ICommand";
import { ReturnToStartEvent } from "../Event/Events";
import { EventType } from "../PointGameApp";

export class ReturnToStartCommand extends AbstractCommand {

    protected OnExecute(): void {
        this.SendEvent<ReturnToStartEvent>(EventType.ReturnToStartEvent);
    }
}