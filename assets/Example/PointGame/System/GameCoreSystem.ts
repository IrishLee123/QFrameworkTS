import { AbstractSystem, ISystem } from "../../../QFramework/Architecture/ISystem";
import { CreateEnemyEvent, GameEndEvent, GameStartEvent } from "../Event/Events";
import { IGameModel } from "../Model/GameModel";
import { IUserModel } from "../Model/UserModel";
import { EventType, PointGameClassKey } from "../PointGameApp";

export interface IGameCoreSystem extends ISystem {
    update(dt: number): void;
}

export class GameCoreSystem extends AbstractSystem implements IGameCoreSystem {

    protected OnInit(): void {

        this.RegisterEvent<GameStartEvent>(EventType.GameStartEvent, this.onGameStart, this);

        this.GetModel<IGameModel>(PointGameClassKey.GameModel).hp
            .RegisterOnValueChanged((v: number) => {
                if (v <= 0) {
                    // 更新最高分
                    let userModel = this.GetModel<IUserModel>(PointGameClassKey.UserModel);
                    let gameModel = this.GetModel<IGameModel>(PointGameClassKey.GameModel);
                    if (userModel.bestScore.value < gameModel.score.value) {
                        userModel.bestScore.value = gameModel.score.value;
                    }

                    // GAMEOVER
                    this.SendEvent(EventType.GameEndEvent);
                    this.gameStarted = false;
                }
            }, this);

        this.size.x = 0 + this.offset.x;
        this.size.y = 0 + this.offset.w;
        this.size.z = cc.winSize.width - this.offset.y;
        this.size.w = cc.winSize.height - this.offset.z;

        console.log(this.size.toString());
    }

    private totalTimer: number = 0;
    private duration: number = 1.5;

    private timer: number = 0;
    private gameStarted: boolean = false;

    private offset: cc.Vec4 = new cc.Vec4(50, 50, 200, 50);
    private size: cc.Vec4 = new cc.Vec4();

    public update(dt: number): void {
        if (!this.gameStarted) {
            return;
        }

        this.totalTimer += dt;
        this.duration = 3 / (2 * this.totalTimer / 5 + 2);

        this.timer += dt;
        if (this.timer > this.duration) {
            this.createOneEnemy();
            this.timer = 0;
        }
    }

    private createOneEnemy(): void {
        // 随机坐标
        let x = this.size.x + Math.random() * (this.size.z - this.size.x);
        let y = this.size.y + Math.random() * (this.size.w - this.size.y);

        let type = Math.random() < 0.2 ? 2 : 1;

        // 发送创建敌人事件
        this.SendEvent<CreateEnemyEvent>(EventType.CreateEnemyEvent, <CreateEnemyEvent>{
            type: type,
            worldPos: cc.v2(x, y)
        });
    }

    private onGameStart(): void {
        this.gameStarted = true;
        // 重置比赛数据
        this.totalTimer = 0;
        this.GetModel<IGameModel>(PointGameClassKey.GameModel).hp.value = 1;
        this.GetModel<IGameModel>(PointGameClassKey.GameModel).score.value = 0;
    }
}