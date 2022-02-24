import { AbstractSystem } from "../ISystem";

export interface ICanGetSystem {
    GetSystem<T extends AbstractSystem>(key: string): T;
}