export interface ICanSendEvent {
    SendEvent<T>(eventType: string, e?: T): void;
}