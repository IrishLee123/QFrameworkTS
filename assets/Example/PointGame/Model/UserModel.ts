import { AbstractModel, IModel } from "../../../QFramework/Architecture/IModel";
import { BindableProperty } from "../../../QFramework/BindableProperty/BindableProperty";
import { ILocalStorage } from "../../../QFramework/Storage/LocalStorage";
import { PointGameClassKey } from "../PointGameApp";

export interface IUserModel extends IModel {
    bestScore: BindableProperty<number>;
}

export class UserModel extends AbstractModel implements IUserModel {

    public GetClassName(): string {
        return PointGameClassKey.UserModel;
    }

    public bestScore: BindableProperty<number> = new BindableProperty<number>(0);

    /**
     * 在这个函数中进行数据的初始化操作，即从本地或从服务器读取。
     */
    protected OnInit(): void {

        let localStorage = this.GetUtility<ILocalStorage>(PointGameClassKey.LocalStorage);

        // 初始化BestScore
        this.bestScore.value = localStorage.GetNumber(UserModelDataKey.BestScore, 0);
        this.bestScore.RegisterOnValueChanged((v: number) => {
            localStorage.SaveNumber(UserModelDataKey.BestScore, v);
        }, this);
    }
}

export const enum UserModelDataKey {
    BestScore = "BestScore",
}