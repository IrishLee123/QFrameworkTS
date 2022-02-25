import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { GameEndEvent, GameStartEvent, ReturnToStartEvent } from "../../Event/Events";
import { EventType, PointGameApp } from "../../PointGameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export class UIController extends AbstractController {

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }

    @property(cc.Node)
    private userInfoNode: cc.Node = null;

    @property(cc.Node)
    private startGameUI: cc.Node = null;

    @property(cc.Node)
    private gameUI: cc.Node = null;

    @property(cc.Node)
    private settleUI: cc.Node = null;

    protected start(): void {

        this.RegisterEvent<GameStartEvent>(EventType.GameStartEvent, () => {
            // 游戏开始时
            this.startGameUI.active = false;
            this.gameUI.active = true;
        }, this).UnRegisterWhenGameObjectDestroyed(this.node);

        this.RegisterEvent<GameEndEvent>(EventType.GameEndEvent, () => {
            // 游戏结束时
            this.gameUI.active = false;
            this.settleUI.active = true;
        }, this).UnRegisterWhenGameObjectDestroyed(this.node);

        this.RegisterEvent<ReturnToStartEvent>(EventType.ReturnToStartEvent, () => {
            // 点击返回按钮时
            this.settleUI.active = false;
            this.startGameUI.active = true;
        }, this).UnRegisterWhenGameObjectDestroyed(this.node);

    }
}
