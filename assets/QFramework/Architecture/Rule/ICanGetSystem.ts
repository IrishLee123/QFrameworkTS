import { ISystem } from "../ISystem";

export interface ICanGetSystem {
    GetSystem<T extends ISystem>(type: { prototype: T }): T;
}