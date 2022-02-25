import { Architecture, IArchitecture } from "../QFramework/Architecture/Architecture";
import { AbstractController } from "../QFramework/Architecture/IController";
import { AbstractModel } from "../QFramework/Architecture/IModel";
import { AbstractSystem } from "../QFramework/Architecture/ISystem";
import { BindableProperty } from "../QFramework/BindableProperty/BindableProperty";
import { ILocalStorage, LocalStorage } from "../QFramework/Storage/LocalStorage";

export class TestApp extends Architecture<TestApp>{

    protected IocInjection(): void {

        // 注册Utility
        this.RegisterUtility<ILocalStorage>(new LocalStorage());

        // 注册Model
        this.RegisterModel<TestModel>(new TestModel());
    }

}

export const enum ClassKey {
    TestSystem = "TestSYstem",
    LocalStorage = "LocalStorage",
}

export class TestSystem extends AbstractSystem {

    protected OnInit(): void {

    }

}

export class TestModel extends AbstractModel {

    public testValue_1: BindableProperty<number> = new BindableProperty(1);

    public testValue_2: BindableProperty<string> = new BindableProperty("");

    protected OnInit(): void {

        let localStorage = this.GetUtility<ILocalStorage>(ClassKey.LocalStorage);

        this.testValue_1.value = localStorage.GetNumber("testValue_1", 1);
        this.testValue_1.RegisterOnValueChanged((v: number) => {
            localStorage.SaveNumber("testValue_1", v);
        }, this);

        this.testValue_2.value = localStorage.GetString("testValue_2", "test");
        this.testValue_2.RegisterOnValueChanged((v: string) => {
            localStorage.SaveString("testValue_2", v);
        }, this);
    }
}

const { ccclass, property } = cc._decorator;

@ccclass
export class Test extends AbstractController {

    protected GetArchitecture(): IArchitecture {
        return TestApp.Interface;
    }

    protected start(): void {
        console.log(this.GetModel<TestModel>("TestModel").testValue_1.value);
    }

}

