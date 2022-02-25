import { Delegate } from "../Delegate/Delegate";

export interface IUnRegister {
    UnRegister(): void;
    UnRegisterWhenGameObjectDestroyed(node: cc.Node): void;
}

export interface IEventSystem {
    Send<T>(eventType: string, e: T): void;
    Register<T>(type: string, onEvent: (e: T) => void, target: object): IUnRegister;
    UnRegister<T>(type: string, onEvent: (e: T) => void, target: object): void;
}

export interface IRegisterations { }

export class EventSystemUnRegister<T> implements IUnRegister {

    public constructor(eventSystem: IEventSystem, eventType: string, onEvent: (e: T) => void, target: object = null) {
        this.mEventSystem = eventSystem;
        this.mEventType = eventType;
        this.mOnEvent = onEvent;
        this.mTarget = target;
    }

    private mEventSystem: IEventSystem = null;
    private mEventType: string = "";
    private mOnEvent: (e: T) => void = null;
    private mTarget: object = null;

    public UnRegister(): void {
        this.mEventSystem.UnRegister<T>(this.mEventType, this.mOnEvent, this.mTarget);
        this.mEventSystem = null;
        this.mOnEvent = null;
        this.mTarget = null;
    }

    public UnRegisterWhenGameObjectDestroyed(node: cc.Node): void {
        let trigger = node.getComponent(UnRegisterDestroyTrigger);

        if (!trigger) {
            trigger = node.addComponent(UnRegisterDestroyTrigger);
        }

        trigger.AddUnRegister(this);
    }
}

export class UnRegisterDestroyTrigger extends cc.Component {

    private mUnRegisters: Set<IUnRegister> = new Set();

    public AddUnRegister(unRegister: IUnRegister): void {
        this.mUnRegisters.add(unRegister);
    }

    protected onDestroy(): void {
        this.mUnRegisters.forEach((value: IUnRegister) => {
            value.UnRegister();
        });

        this.mUnRegisters.clear();
    }
}

export class EventSystem implements IEventSystem {

    private mEventRegisteration: Map<string, IRegisterations> = new Map<string, IRegisterations>();

    public Register<T>(type: string, onEvent: (e: T) => void, target: object): IUnRegister {

        if (!this.mEventRegisteration.has(type)) {
            this.mEventRegisteration.set(type, new Registerations<T>());
        }

        let registeration = this.mEventRegisteration.get(type) as Registerations<T>;
        registeration.OnEvent.addListener(onEvent, target);

        return new EventSystemUnRegister(this, type, onEvent, target);
    }

    public UnRegister<T>(type: string, onEvent: (e: T) => void, target: object) {
        if (!this.mEventRegisteration.has(type)) {
            return;
        }

        let registeration = this.mEventRegisteration.get(type) as Registerations<T>;
        registeration.OnEvent.removeListener(onEvent, target);
    }

    public Send<T>(eventType: string, e: T): void {
        if (!this.mEventRegisteration.has(eventType)) {
            return;
        }
        let registeration = this.mEventRegisteration.get(eventType) as Registerations<T>;
        registeration.OnEvent.invoke(e);
    }
}

export class Registerations<T> implements IRegisterations {

    public OnEvent: Delegate<T> = new Delegate();

}