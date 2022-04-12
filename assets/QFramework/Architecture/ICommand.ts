import { IArchitecture } from "./Architecture";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { IModel } from "./IModel";
import { IQuery } from "./IQuery";
import { ISystem } from "./ISystem";
import { IUtility } from "./IUtility";
import { ICanDoQuery } from "./Rule/ICanDoQuery";
import { ICanGetModel } from "./Rule/ICanGetModel";
import { ICanGetSystem } from "./Rule/ICanGetSystem";
import { ICanGetUtility } from "./Rule/ICanGetUtility";
import { ICanSendCommand } from "./Rule/ICanSendCommand";
import { ICanSendEvent } from "./Rule/ICanSendEvent";

export interface ICommand extends
    ICanSetArchitecture, ICanGetModel, ICanGetSystem, ICanGetUtility, ICanSendEvent, ICanSendCommand, ICanDoQuery {

    Execute(): void;
}

export abstract class AbstractCommand implements ICommand {


    private mArchitecture: IArchitecture = null;

    public Execute(): void {
        this.OnExecute();
    }

    public SetArchitecture(architecture: IArchitecture): void {
        this.mArchitecture = architecture;
    }

    public GetModel<T extends IModel>(type: { prototype: T }): T {
        return this.mArchitecture.GetModel<T>(type);
    }

    public GetSystem<T extends ISystem>(type: { prototype: T }): T {
        return this.mArchitecture.GetSystem<T>(type);
    }

    public GetUtility<T extends IUtility>(type: { prototype: T }): T {
        return this.mArchitecture.GetUtility<T>(type);
    }

    public SendEvent<T>(eventType: string, e: T = null): void {
        return this.mArchitecture.SendEvent<T>(eventType, e);
    }

    public SendCommand<T extends ICommand>(command: T): void {
        this.mArchitecture.SendCommand<T>(command);
    }

    public DoQuery<D, T extends IQuery<D>>(query: T): D {
        return this.mArchitecture.DoQuery<D, T>(query);
    }

    protected abstract OnExecute(): void;
}