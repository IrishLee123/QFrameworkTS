import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { EnemyAttackCommand } from "../../Command/EnemyAttackCommand";
import { EventType, PointGameApp } from "../../PointGameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export class Bomb extends AbstractController {

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }

    private timer: number = 0;

    private readonly lifeTime: number = 2;

    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);

        this.RegisterEvent(EventType.GameEndEvent, this.onGameEnd, this)
            .UnRegisterWhenGameObjectDestroyed(this.node);
    }

    protected update(dt: number): void {

        this.timer += dt;

        if (this.timer > this.lifeTime) {
            console.log("炸弹销毁");
            this.node.destroy();
            return;
        }

        this.node.opacity = 255 * (this.lifeTime - this.timer) / this.lifeTime;
    }

    protected onDisable(): void {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    }

    private onTouch(): void {
        console.log("炸弹爆炸");

        this.SendCommand(new EnemyAttackCommand());
        this.node.destroy();
    }

    private onGameEnd(): void {
        this.node.destroy();
    }
}
