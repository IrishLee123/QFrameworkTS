import { IArchitecture } from "./Architecture";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { IUtility } from "./IUtility";
import { ICanGetUtility } from "./Rule/ICanGetUtility";
import { ICanSendEvent } from "./Rule/ICanSendEvent";

export interface IModel extends
    ICanSetArchitecture, ICanGetUtility, ICanSendEvent {
    Init(): void;
}

export abstract class AbstractModel implements IModel {

    private mArchitecture: IArchitecture = null;
    public SetArchitecture(architecture: IArchitecture): void {
        this.mArchitecture = architecture;
    }

    public GetModel<T extends IModel>(type: { prototype: T }): T {
        return this.mArchitecture.GetModel<T>(type);
    }

    public GetUtility<T extends IUtility>(type: { prototype: T }): T {
        return this.mArchitecture.GetUtility<T>(type);
    }

    public SendEvent<T>(eventType: string, e: T): void {
        this.SendEvent<T>(eventType, e);
    }

    public Init(): void {
        this.OnInit();
    }

    protected abstract OnInit(): void;
}