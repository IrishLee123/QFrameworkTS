import { Delegate } from "../Delegate/Delegate";
import { IUnRegister, UnRegisterDestroyTrigger } from "../Event/EventSystem";

export class BindableProperty<T>{

    public constructor(defaultValue: T) {
        this.value = defaultValue;
    }

    private _value: T = null;

    public get value(): T {
        return this._value;
    }

    private mOnValueChanged: Delegate<T> = null;

    public set value(v: T) {
        if (this._value == v) {
            return;
        }
        this._value = v;

        // invoke when value changed
        this.mOnValueChanged?.invoke(this._value);
    }

    public RegisterOnValueChanged(valueChangeFunc: (v: T) => void, target: object = null): IUnRegister {
        if (!this.mOnValueChanged) {
            this.mOnValueChanged = new Delegate<T>();
        }

        this.mOnValueChanged.addListener(valueChangeFunc, target);

        return new BindablePropertyUnRegister<T>(this, valueChangeFunc, target);;
    }

    public UnRegisterOnValueChanged(valueChangeFunc: (v: T) => void, target: object): void {
        this.mOnValueChanged?.removeListener(valueChangeFunc, target);
    }
}

export class BindablePropertyUnRegister<T> implements IUnRegister {

    private mBindableProperty: BindableProperty<T> = null;
    private mOnValueChanged: (v: T) => void = null;
    private mTarget: object = null;

    public constructor(bindableProperty: BindableProperty<T>, onValueChanged: (v: T) => void, target: object) {
        this.mBindableProperty = bindableProperty;
        this.mOnValueChanged = onValueChanged;
        this.mTarget = target;
    }

    public UnRegisterWhenGameObjectDestroyed(node: cc.Node): void {
        let trigger = node.getComponent(UnRegisterDestroyTrigger);

        if (!trigger) {
            trigger = node.addComponent(UnRegisterDestroyTrigger);
        }

        trigger.AddUnRegister(this);
    }

    public UnRegister(): void {
        if (this.mBindableProperty && this.mOnValueChanged) {

            this.mBindableProperty.UnRegisterOnValueChanged(this.mOnValueChanged, this.mTarget);

            this.mBindableProperty = null;
            this.mOnValueChanged = null;
            this.mTarget = null;
        }
    }
}