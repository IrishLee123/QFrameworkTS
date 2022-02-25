import { IUnRegister } from "../../Event/EventSystem";

export interface ICanRegisterEvent {
    RegisterEvent<T>(eventType: string, onEvent: (v?: T) => void, target?: object): IUnRegister;
    UnRegisterEvent<T>(eventType: string, onEvent: (v?: T) => void, target?: object): void;
}