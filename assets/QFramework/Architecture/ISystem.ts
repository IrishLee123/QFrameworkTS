import { IUnRegister } from "../Event/EventSystem";
import { IArchitecture } from "./Architecture";
import { IGetClassName } from "./ICanGetClassName";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { IModel } from "./IModel";
import { IUtility } from "./IUtility";
import { ICanGetModel } from "./Rule/ICanGetModel";
import { ICanGetSystem } from "./Rule/ICanGetSystem";
import { ICanGetUtility } from "./Rule/ICanGetUtility";
import { ICanRegisterEvent } from "./Rule/ICanRegisterEvent";
import { ICanSendEvent } from "./Rule/ICanSendEvent";

export interface ISystem extends
    IGetClassName, ICanSetArchitecture, ICanGetSystem, ICanGetModel, ICanGetUtility, ICanRegisterEvent, ICanSendEvent {
    Init(): void;
}

export abstract class AbstractSystem implements ISystem {

    private mArchitecture: IArchitecture = null;

    public GetClassName(): string {
        return (<any>this).constructor.name;
    }

    public SetArchitecture(architecture: IArchitecture): void {
        this.mArchitecture = architecture;
    }

    public GetModel<T extends IModel>(key: string): T {
        return this.mArchitecture?.GetModel<T>(key);
    }

    public GetSystem<T extends ISystem>(key: string): T {
        return this.mArchitecture.GetSystem<T>(key);
    }

    public GetUtility<T extends IUtility>(key: string): T {
        return this.mArchitecture.GetUtility<T>(key);
    }

    public RegisterEvent<T>(eventType: string, onEvent: (v: T) => void, target: object): IUnRegister {
        return this.mArchitecture.RegisterEvent<T>(eventType, onEvent, target);
    }

    public UnRegisterEvent<T>(eventType: string, onEvent: (v: T) => void, target: object): void {
        this.mArchitecture.UnRegisterEvent<T>(eventType, onEvent, target);
    }

    public SendEvent<T>(eventType: string, e?: T): void {
        this.mArchitecture.SendEvent<T>(eventType, e);
    }

    public Init(): void {
        this.OnInit();
    }

    protected abstract OnInit(): void;
}