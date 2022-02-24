import { IArchitecture } from "./Architecture";
import { IGetClassName } from "./ICanGetClassName";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { AbstractModel } from "./IModel";
import { ICanGetModel } from "./Rule/ICanGetModel";

export interface ISystem extends IGetClassName, ICanSetArchitecture, ICanGetModel {
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

    public GetModel<T extends AbstractModel>(key: string): T {
        return this.mArchitecture?.GetModel<T>(key);
    }

    public Init(): void {
        this.OnInit();
    }

    protected abstract OnInit(): void;
}