import { IUnRegister } from "../Event/EventSystem";
import { IArchitecture } from "./Architecture";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { ICommand } from "./ICommand";
import { IModel } from "./IModel";
import { IQuery } from "./IQuery";
import { IUtility } from "./IUtility";
import { ICanDoQuery } from "./Rule/ICanDoQuery";
import { ICanGetModel } from "./Rule/ICanGetModel";
import { ICanGetSystem } from "./Rule/ICanGetSystem";
import { ICanGetUtility } from "./Rule/ICanGetUtility";
import { ICanRegisterEvent } from "./Rule/ICanRegisterEvent";
import { ICanSendCommand } from "./Rule/ICanSendCommand";
import { ICanSendEvent } from "./Rule/ICanSendEvent";

export interface ISystem extends
    ICanSetArchitecture, ICanGetSystem, ICanGetModel, ICanGetUtility, ICanRegisterEvent,
    ICanSendEvent, ICanDoQuery, ICanSendCommand {
    Init(): void;
}

export abstract class AbstractSystem implements ISystem {

    private mArchitecture: IArchitecture = null;

    public SetArchitecture(architecture: IArchitecture): void {
        this.mArchitecture = architecture;
    }

    public GetModel<T extends IModel>(type: { prototype: T }): T {
        return this.mArchitecture?.GetModel<T>(type);
    }

    public GetSystem<T extends ISystem>(type: { prototype: T }): T {
        return this.mArchitecture.GetSystem<T>(type);
    }

    public GetUtility<T extends IUtility>(type: { prototype: T }): T {
        return this.mArchitecture.GetUtility<T>(type);
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

    public DoQuery<D, T extends IQuery<D>>(query: T): D {
        return this.mArchitecture.DoQuery<D, T>(query);
    }

    public SendCommand<T extends ICommand>(command: T): void {
        this.mArchitecture.SendCommand<T>(command);
    }


    public Init(): void {
        this.OnInit();
    }

    protected abstract OnInit(): void;
}