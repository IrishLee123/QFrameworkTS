export interface IUnRegister {
    UnRegister(): void;
}

export interface IEventSystem {
    Send<T>(e: T): void;
    Register<T>(type: string, onEvent: (e: T) => void, target: object): IUnRegister;
    UnRegister<T>(type: string, onEvent: (e: T) => void, target: object);
}

export class EventSystemUnRegister<T> implements IUnRegister {

    public constructor(eventSystem: IEventSystem, onEvent: (e: T) => void, target: object = null) {
        this.mEventSystem = eventSystem;
        this.mOnEvent = onEvent;
        this.mTarget = target;
    }

    private mEventSystem: IEventSystem = null;
    private mOnEvent: (e: T) => void = null;
    private mTarget: object = null;

    public UnRegister(): void {
        this.mEventSystem.UnRegister<T>(this.mOnEvent, this.mTarget);
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

}