import { IArchitecture } from "./Architecture";
import { IGetClassName } from "./ICanGetClassName";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { ICanGetModel } from "./Rule/ICanGetModel";

export interface IModel extends IGetClassName, ICanSetArchitecture,
    ICanGetModel {
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

    public GetModel<T extends AbstractModel>(key: string): T {
        return this.GetArchitecture().GetModel<T>(key);
    }

    public Init(): void {
        this.OnInit();
    }

    private GetArchitecture(): IArchitecture {
        return this.mArchitecture;
    }

    protected abstract OnInit(): void;
}