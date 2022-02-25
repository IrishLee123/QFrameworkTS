import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { ReturnToStartCommand } from "../../Command/ReturnToStartCommand";
import { IGameModel } from "../../Model/GameModel";
import { IUserModel } from "../../Model/UserModel";
import { PointGameApp, PointGameClassKey } from "../../PointGameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export class SettleUI extends AbstractController {

    @property(cc.Label)
    private currentScoreLab: cc.Label = null;

    @property(cc.Label)
    private bestScoreLab: cc.Label = null;

    // protected start(): void {

    //     this.GetModel<IGameModel>(PointGameClassKey.GameModel).score
    //         .RegisterOnValueChanged((v: number) => {
    //             // 刷新UI显示
    //         }, this).UnRegisterWhenGameObjectDestroyed(this.node);


    //     this.GetModel<IUserModel>(PointGameClassKey.UserModel).bestScore
    //         .RegisterOnValueChanged((v: number) => {
    //             // 刷新UI显示
    //             this.bestScoreLab.string = "得分: " + v;
    //         }, this).UnRegisterWhenGameObjectDestroyed(this.node);
    // }

    protected onEnable(): void {
        this.currentScoreLab.string = "得分: " + this.GetModel<IGameModel>(PointGameClassKey.GameModel).score.value;
        this.bestScoreLab.string = "最高分: " + this.GetModel<IUserModel>(PointGameClassKey.UserModel).bestScore.value;
    }

    public onBtnReturnClick(): void {
        this.SendCommand(new ReturnToStartCommand());
    }

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }
}
