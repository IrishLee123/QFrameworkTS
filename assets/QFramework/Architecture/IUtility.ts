import { IGetClassName } from "./ICanGetClassName";

export interface IUtility extends IGetClassName { }

export abstract class AbstractUtility implements IUtility {

    public abstract GetClassName(): string;
}