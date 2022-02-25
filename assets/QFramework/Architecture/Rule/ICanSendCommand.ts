import { ICommand } from "../ICommand";

export interface ICanSendCommand {
    SendCommand<T extends ICommand>(command: T): void;
}