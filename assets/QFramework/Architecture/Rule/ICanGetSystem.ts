import { ISystem } from "../ISystem";

export interface ICanGetSystem {
    GetSystem<T extends ISystem>(key: string): T;
}