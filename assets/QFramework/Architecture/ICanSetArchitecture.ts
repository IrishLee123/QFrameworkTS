import { IArchitecture } from "./Architecture";

export interface ICanSetArchitecture {
    SetArchitecture(architecture: IArchitecture): void;
}