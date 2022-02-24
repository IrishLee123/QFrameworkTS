import { BindableProperty } from "../QFramework/BindableProperty/BindableProperty";
import { AppTest, ClassNameKey, UserModel } from "./AppTest";

const { ccclass, property } = cc._decorator;

@ccclass
export class DelegateExample extends cc.Component {

    private mNumber: BindableProperty<number> = new BindableProperty(0);

    protected start(): void {
        this.mNumber.RegisterOnValueChanged((v: number) => {
            console.log("value change: " + v);
        });

        this.mNumber.value += 1234;

        let a = AppTest.Interface.GetModel<UserModel>(ClassNameKey.UserModel);
        console.log(a.age.value);
    }

    protected update(dt: number): void {
        this.getType<number>(123);
    }

    protected onDestroy(): void { }

    private onValueChanged(v: number): void {
    }

    private getType<T>(instance: T) {
    }

}
