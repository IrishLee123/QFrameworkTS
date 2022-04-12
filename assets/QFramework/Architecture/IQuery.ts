import { IArchitecture } from "./Architecture";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { IModel } from "./IModel";
import { ISystem } from "./ISystem";
import { IUtility } from "./IUtility";
import { ICanGetModel } from "./Rule/ICanGetModel";
import { ICanGetSystem } from "./Rule/ICanGetSystem";
import { ICanGetUtility } from "./Rule/ICanGetUtility";

export interface IQuery<T> extends
    ICanSetArchitecture, ICanGetModel, ICanGetSystem, ICanGetUtility {
    DoQuery(): T;
}

export abstract class AbstractQuery<T> implements IQuery<T>{

    private mArchitecture: IArchitecture = null;

    public DoQuery(): T {
        return this.OnDo();
    }

    public SetArchitecture(architecture: IArchitecture): void {
        this.mArchitecture = architecture;
    }

    public GetModel<T extends IModel>(type: { prototype: T; }): T {
        return this.mArchitecture.GetModel(type);
    }

    public GetSystem<T extends ISystem>(type: { prototype: T; }): T {
        return this.mArchitecture.GetSystem(type);
    }

    public GetUtility<T extends IUtility>(type: { prototype: T; }): T {
        return this.mArchitecture.GetUtility(type);
    }

    protected abstract OnDo(): T;
}