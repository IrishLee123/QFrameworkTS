import { IGetClassName } from "./ICanGetClassName";

export interface IUtility extends IGetClassName { }

export class AbstractUtility implements IUtility {

    public GetClassName(): string {
        return (<any>this).constructor.name;
    }

}