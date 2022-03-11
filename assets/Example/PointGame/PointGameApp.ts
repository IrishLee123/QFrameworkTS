import { Architecture } from "../../QFramework/Architecture/Architecture";
import { ILocalStorage, LocalStorage } from "../../QFramework/Storage/LocalStorage";
import { GameModel, IGameModel } from "./Model/GameModel";
import { IUserModel, UserModel } from "./Model/UserModel";
import { GameCoreSystem, IGameCoreSystem } from "./System/GameCoreSystem";

export class PointGameApp extends Architecture<PointGameApp> {

    /**
     * 这里执行IOC注入
     * 同时可以看到依赖了那些功能模块及工具、系统
     */
    protected IocInjection(): void {

        // Utility
        this.RegisterUtility<ILocalStorage>(new LocalStorage());

        // Model
        this.RegisterModel<IUserModel>(new UserModel());
        this.RegisterModel<IGameModel>(new GameModel());

        // System
        this.RegisterSystem<IGameCoreSystem>(new GameCoreSystem());
    }

}

export const enum EventType {

    GameStartEvent = "GameStartEvent",

    GameEndEvent = "GameEndEvent",

    ReturnToStartEvent = "ReturnToStartEvent",

    CreateEnemyEvent = "CreateEnemyEvent",
    
}