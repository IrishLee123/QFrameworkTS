import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { IUserModel } from "../../Model/UserModel";
import { PointGameApp, PointGameClassKey } from "../../PointGameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export class UserInfoUI extends AbstractController {

    @property(cc.Label)
    private bestScoreLab: cc.Label = null;

    protected start(): void {
        this.bestScoreLab.string = "最高分: " + this.GetModel<IUserModel>(PointGameClassKey.UserModel).bestScore.value
        this.GetModel<IUserModel>(PointGameClassKey.UserModel).bestScore.
            RegisterOnValueChanged((v: number) => {
                this.bestScoreLab.string = "最高分: " + Math.round(v);
            }, this);
    }

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }
}
