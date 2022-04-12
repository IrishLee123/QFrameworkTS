import { IUnRegister } from "../Event/EventSystem";
import { IArchitecture } from "./Architecture";
import { ICommand } from "./ICommand";
import { IModel } from "./IModel";
import { IQuery } from "./IQuery";
import { ISystem } from "./ISystem";
import { ICanDoQuery } from "./Rule/ICanDoQuery";
import { ICanGetModel } from "./Rule/ICanGetModel";
import { ICanGetSystem } from "./Rule/ICanGetSystem";
import { ICanRegisterEvent } from "./Rule/ICanRegisterEvent";
import { ICanSendCommand } from "./Rule/ICanSendCommand";

export interface IController extends
    ICanGetModel, ICanGetSystem, ICanSendCommand, ICanRegisterEvent, ICanDoQuery {
}

export abstract class AbstractController extends cc.Component implements IController {

    public GetModel<T extends IModel>(type: { prototype: T }): T {
        return this.GetArchitecture().GetModel<T>(type);
    }

    public GetSystem<T extends ISystem>(type: { prototype: T }): T {
        return this.GetArchitecture().GetSystem<T>(type);
    }

    public SendCommand<T extends ICommand>(command: T): void {
        return this.GetArchitecture().SendCommand<T>(command);
    }

    public DoQuery<D, T extends IQuery<D>>(query: T): D {
        return this.GetArchitecture().DoQuery(query);
    }

    public RegisterEvent<T>(eventType: string, onEvent: (v?: T) => void, target: object): IUnRegister {
        return this.GetArchitecture().RegisterEvent<T>(eventType, onEvent, target);
    }

    public UnRegisterEvent<T>(eventType: string, onEvent: (v?: T) => void, target: object): void {
        this.GetArchitecture().UnRegisterEvent(eventType, onEvent, target);
    }

    protected abstract GetArchitecture(): IArchitecture;
}