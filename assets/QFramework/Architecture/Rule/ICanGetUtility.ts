import { IUtility } from "../IUtility";

export interface ICanGetUtility {
    GetUtility<T extends IUtility>(type: { prototype: T }): T;
}