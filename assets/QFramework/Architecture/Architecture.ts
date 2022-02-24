import { Delegate } from "../Delegate/Delegate";
import { IOCContainer } from "../IOC/IOCContainer";
import { AbstractModel, IModel } from "./IModel";
import { ISystem } from "./ISystem";

export interface IArchitecture {

    RegisterModel<T extends IModel>(model: T): void;
    RegisterSystem<T extends ISystem>(system: T): void;
    RegisterUtility<T extends IUtility>(utility: T): void;

    GetModel<T extends IModel>(key: string): T;
    GetSystem<T extends ISystem>(key: string): T;
    GetUtility<T extends IUtility>(key: string): T;

    SendCommand<T extends ICommand>(command: T);
    SendEvent<T>
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

            this.mArchitecture.mModels.forEach(model => {
                model.Init();
            });

            this.mArchitecture.mModels = [];

            this.mArchitecture.mInited = true;
        }

    }

    private mContianer: IOCContainer = new IOCContainer();

    public OnRegisterPatch: Delegate<T> = new Delegate();

    private mInited: boolean = false;

    private mModels: IModel[] = [];

    public RegisterModel<T extends AbstractModel>(model: T): void {
        // 指定模块所属架构
        model.SetArchitecture(this);

        this.mContianer.Register(model.GetClassName(), model);

        if (!this.mInited) {
            this.mModels.push(model);
        } else {
            model.Init();
        }
    }

    public GetModel<T extends AbstractModel>(key: string): T {
        return this.mContianer.Get<T>(key);
    }

    protected IocInjection(): void { }
}