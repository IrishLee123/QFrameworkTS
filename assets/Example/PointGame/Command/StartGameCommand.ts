import { AbstractCommand } from "../../../QFramework/Architecture/ICommand";
import { GameStartEvent } from "../Event/Events";
import { GameModel, IGameModel } from "../Model/GameModel";
import { EventType } from "../PointGameApp";

export class StartGameCommand extends AbstractCommand {

    protected OnExecute(): void {

        // 开始新一局游戏的时候重置分数
        this.GetModel<IGameModel>(GameModel).score.value = 0;

        // 发送游戏开始的事件
        this.SendEvent<GameStartEvent>(EventType.GameStartEvent);
    }
}