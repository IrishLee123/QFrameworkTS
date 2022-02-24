import { Architecture } from "../QFramework/Architecture/Architecture";
import { AbstractModel } from "../QFramework/Architecture/IModel";
import { BindableProperty } from "../QFramework/BindableProperty/BindableProperty";

export class AppTest extends Architecture<AppTest>{

    protected IocInjection(): void {
        this.RegisterModel<UserModel>(new UserModel());
    }
}

export class IUserModel {
    age: BindableProperty<number>;
}

export class UserModel extends AbstractModel implements IUserModel {

    public age: BindableProperty<number> = new BindableProperty(1);

    protected OnInit(): void {
    }

}

export const enum ClassNameKey {
    UserModel = "UserModel",
}