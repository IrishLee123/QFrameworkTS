import { IUtility } from "../IUtility";

export interface ICanGetUtility {
    GetUtility<T extends IUtility>(key: string): T;
}