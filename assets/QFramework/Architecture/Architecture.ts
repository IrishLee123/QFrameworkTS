import { Delegate } from "../Delegate/Delegate";
import { EventSystem, IEventSystem, IUnRegister } from "../Event/EventSystem";
import { IOCContainer } from "../IOC/IOCContainer";
import { ICommand } from "./ICommand";
import { IModel } from "./IModel";
import { ISystem } from "./ISystem";
import { IUtility } from "./IUtility";

export interface IArchitecture {

    RegisterModel<T extends IModel>(model: T): void;
    RegisterSystem<T extends ISystem>(system: T): void;
    RegisterUtility<T extends IUtility>(utility: T): void;

    GetModel<T extends IModel>(key: string): T;
    GetSystem<T extends ISystem>(key: string): T;
    GetUtility<T extends IUtility>(key: string): T;

    SendCommand<T extends ICommand>(command: T): void;
    SendEvent<T>(eventType: string, event?: T): void;

    RegisterEvent<T>(eventType: string, onEvent: (e?: T) => void, target: object): IUnRegister;
    UnRegisterEvent<T>(eventType: string, onEvent: (e?: T) => void, target: object): void;
}

export class Architecture<T> implements IArchitecture {

    private static mArchitecture: any;

    public static get Interface(): IArchitecture {
        if (!this.mArchitecture) {
            this.MakeSureArchitecture();
        }

        return this.mArchitecture as IArchitecture;
    }

    private static MakeSureArchitecture(): void {

        if (!this.mArchitecture) {

            // init architecture
            (<any>this).mArchitecture = new this();

            let t = this.mArchitecture.constructor.name;
            console.log(t);

            // do IOC injection of every item in this architecture
            this.mArchitecture.IocInjection();

            this.mArchitecture.OnRegisterPatch?.invoke(this.Interface);

            // 执行Model层的Init函数
            this.mArchitecture.mModels.forEach(model => {
                model.Init();
            });
            this.mArchitecture.mModels = [];

            // 执行System层的Init函数
            this.mArchitecture.mSystems.forEach(system => {
                system.Init();
            });
            this.mArchitecture.mSystems = [];

            this.mArchitecture.mInited = true;
        }
    }

    private mContianer: IOCContainer = new IOCContainer();

    public OnRegisterPatch: Delegate<T> = new Delegate();

    private mInited: boolean = false;

    private mModels: IModel[] = [];
    private mSystems: ISystem[] = [];

    public RegisterModel<T extends IModel>(model: T): void {
        // 指定模块所属架构
        model.SetArchitecture(<any>this);

        this.mContianer.Register(model.GetClassName(), model);

        if (!this.mInited) {
            this.mModels.push(model);
        } else {
            model.Init();
        }
    }

    public RegisterSystem<T extends ISystem>(system: T): void {
        system.SetArchitecture(<any>this);

        this.mContianer.Register(system.GetClassName(), system);

        if (!this.mInited) {
            this.mSystems.push(system);
        } else {
            system.Init();
        }
    }

    public RegisterUtility<T extends IUtility>(utility: T): void {
        this.mContianer.Register(utility.GetClassName(), utility);
    }

    public GetSystem<T extends ISystem>(key: string): T {
        return this.mContianer.Get<T>(key);
    }

    public GetUtility<T extends IUtility>(key: string): T {
        return this.mContianer.Get<T>(key);
    }

    public GetModel<T extends IModel>(key: string): T {
        return this.mContianer.Get<T>(key);
    }

    public SendCommand<T extends ICommand>(command: T): void {
        command.SetArchitecture(this);
        command.Execute();
        command.SetArchitecture(null);
    }

    private mEventSystem: IEventSystem = new EventSystem();

    public SendEvent<T>(eventType: string, event: T = null): void {
        this.mEventSystem.Send<T>(eventType, event);
    }

    public RegisterEvent<T>(eventType: string, onEvent: (e?: T) => void, target: object = null): IUnRegister {
        return this.mEventSystem.Register(eventType, onEvent, target);
    }

    public UnRegisterEvent<T>(eventType: string, onEvent: (e?: T) => void, target: object = null): void {
        this.mEventSystem.UnRegister(eventType, onEvent, target);
    }

    protected IocInjection(): void { }
}