import { AbstractModel } from "../IModel";

export interface ICanGetModel {
    GetModel<T extends AbstractModel>(key: string): T;
}