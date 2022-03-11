import { IArchitecture } from "./Architecture";
import { ICanSetArchitecture } from "./ICanSetArchitecture";
import { ICanGetUtility } from "./Rule/ICanGetUtility";

export interface IUtility extends ICanSetArchitecture, ICanGetUtility { }

export abstract class AbstractUtility implements IUtility {

    private mArchitecture: IArchitecture = null;

    public SetArchitecture(architecture: IArchitecture): void {
        this.mArchitecture = architecture;
    }

    public GetUtility<T extends IUtility>(type: { prototype: T; }): T {
        return this.mArchitecture.GetUtility(type);
    }
}