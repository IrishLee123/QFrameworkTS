import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { SettleGameCommand } from "../../Command/SettleGameCommand";
import { EventType, PointGameApp } from "../../PointGameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameController extends AbstractController {

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }

    protected start(): void {
        this.RegisterEvent(EventType.GameStartEvent, this.onGameStart, this)
            .UnRegisterWhenGameObjectDestroyed(this.node);
    }

    protected update(dt: number): void {
        
    }

    private onGameStart(): void {
        console.log("game start");

        this.scheduleOnce(() => {
            this.SendCommand<SettleGameCommand>(new SettleGameCommand());
        }, 5);
    }

}
