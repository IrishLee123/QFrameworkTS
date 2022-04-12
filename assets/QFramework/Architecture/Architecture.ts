import { Delegate } from "../Delegate/Delegate";
import { EventSystem, IEventSystem, IUnRegister } from "../Event/EventSystem";
import { IOCContainer } from "../IOC/IOCContainer";
import { ICommand } from "./ICommand";
import { IModel } from "./IModel";
import { IQuery } from "./IQuery";
import { ISystem } from "./ISystem";
import { IUtility } from "./IUtility";

export interface IArchitecture {

    RegisterModel<T extends IModel>(model: T): void;
    RegisterSystem<T extends ISystem>(system: T): void;
    RegisterUtility<T extends IUtility>(utility: T): void;

    GetModel<T extends IModel>(type: { prototype: T }): T;
    GetSystem<T extends ISystem>(type: { prototype: T }): T;
    GetUtility<T extends IUtility>(type: { prototype: T }): T;

    SendCommand<T extends ICommand>(command: T): void;
    SendEvent<T>(eventType: string, event?: T): void;
    DoQuery<D, T extends IQuery<D>>(query: T): D;

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

        let className = (<any>model).constructor.name;
        this.mContianer.Register(className, model);

        if (!this.mInited) {
            this.mModels.push(model);
        } else {
            model.Init();
        }
    }

    public RegisterSystem<T extends ISystem>(system: T): void {
        // 指定System所属架构
        system.SetArchitecture(<any>this);

        let className = (<any>system).constructor.name;
        this.mContianer.Register(className, system);

        if (!this.mInited) {
            this.mSystems.push(system);
        } else {
            system.Init();
        }
    }

    public RegisterUtility<T extends IUtility>(utility: T): void {
        // 指定Utility所属架构
        utility.SetArchitecture(<any>this);

        let className = (<any>utility).constructor.name;
        this.mContianer.Register(className, utility);
    }

    public GetSystem<T extends ISystem>(type: { prototype: T }): T {
        return this.mContianer.Get<T>(type);
    }

    public GetUtility<T extends IUtility>(type: { prototype: T }): T {
        console.log(typeof type);
        return this.mContianer.Get<T>(type);
    }

    public GetModel<T extends IModel>(type: { prototype: T }): T {
        return this.mContianer.Get<T>(type);
    }

    public SendCommand<T extends ICommand>(command: T): void {
        command.SetArchitecture(this);
        command.Execute();
        command.SetArchitecture(null);
    }

    public DoQuery<D, T extends IQuery<D>>(query: T): D {
        query.SetArchitecture(this);
        let result = query.DoQuery();
        query.SetArchitecture(null);
        return result;
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