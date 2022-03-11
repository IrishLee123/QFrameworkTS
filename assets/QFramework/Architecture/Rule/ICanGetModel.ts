import { IModel } from "../IModel";

export interface ICanGetModel {
    GetModel<T extends IModel>(type: { prototype: T }): T;
}