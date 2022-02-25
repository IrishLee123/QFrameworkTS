import { IModel } from "../IModel";

export interface ICanGetModel {
    GetModel<T extends IModel>(key: string): T;
}