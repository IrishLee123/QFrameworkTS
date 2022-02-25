import { IArchitecture } from "./Architecture";
import { IGetClassName } from "./ICanGetClassName";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { IUtility } from "./IUtility";
import { ICanGetUtility } from "./Rule/ICanGetUtility";
import { ICanSendEvent } from "./Rule/ICanSendEvent";

export interface IModel extends
    IGetClassName, ICanSetArchitecture, ICanGetUtility, ICanSendEvent {
    Init(): void;
}

export abstract class AbstractModel implements IModel {

    public GetClassName(): string {
        return (<any>this).constructor.name;
    }

    private mArchitecture: IArchitecture = null;
    public SetArchitecture(architecture: IArchitecture): void {
        this.mArchitecture = architecture;
    }

    public GetModel<T extends IModel>(key: string): T {
        return this.mArchitecture.GetModel<T>(key);
    }

    public GetUtility<T extends IUtility>(key: string): T {
        return this.mArchitecture.GetUtility<T>(key);
    }

    public SendEvent<T>(eventType: string, e: T): void {
        this.SendEvent<T>(eventType, e);
    }

    public Init(): void {
        this.OnInit();
    }

    protected abstract OnInit(): void;
}