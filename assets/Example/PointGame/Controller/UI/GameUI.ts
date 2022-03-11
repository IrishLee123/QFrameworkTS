import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { GameModel, IGameModel } from "../../Model/GameModel";
import { PointGameApp } from "../../PointGameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameUI extends AbstractController {

    @property(cc.Label)
    private currentScoreLab: cc.Label = null;

    protected start(): void {
        this.currentScoreLab.string = "得分: " + this.GetModel<IGameModel>(GameModel).score.value

        this.GetModel<IGameModel>(GameModel).score
            .RegisterOnValueChanged((v: number) => {
                // 刷新UI显示
                this.currentScoreLab.string = "得分: " + v;
            }, this).UnRegisterWhenGameObjectDestroyed(this.node);
    }

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }
}
