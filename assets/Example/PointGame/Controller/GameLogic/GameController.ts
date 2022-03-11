import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { CreateEnemyEvent } from "../../Event/Events";
import { EventType, PointGameApp } from "../../PointGameApp";
import { GameCoreSystem, IGameCoreSystem } from "../../System/GameCoreSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export class GameController extends AbstractController {

    @property(cc.Prefab)
    private pointPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private bombPrefab: cc.Prefab = null;

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }

    protected start(): void {
        this.RegisterEvent<CreateEnemyEvent>(EventType.CreateEnemyEvent, this.onCreateEnemy, this)
            .UnRegisterWhenGameObjectDestroyed(this.node);

        this.node.getComponent(GameController);
        this.node.getComponent("GameController");
    }

    protected update(dt: number): void {
        this.GetSystem<IGameCoreSystem>(GameCoreSystem).update(dt);
    }

    private onCreateEnemy(e: CreateEnemyEvent): void {
        if (!e) {
            return;
        }

        if (e.type == 1) {
            let enemyNode = cc.instantiate(this.pointPrefab);
            this.node.addChild(enemyNode);
            enemyNode.setPosition(this.node.convertToNodeSpaceAR(e.worldPos));
            console.log("create enemy: " + e.worldPos.toString());
        } else if (e.type = 2) {
            let bombNode = cc.instantiate(this.bombPrefab);
            this.node.addChild(bombNode);
            bombNode.setPosition(this.node.convertToNodeSpaceAR(e.worldPos));
            console.log("create bomb: " + e.worldPos.toString());
        }
    }
}
