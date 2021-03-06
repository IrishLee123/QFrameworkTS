import { AbstractModel, IModel } from "../../../QFramework/Architecture/IModel";
import { BindableProperty } from "../../../QFramework/BindableProperty/BindableProperty";

export interface IGameModel extends IModel {
    score: BindableProperty<number>;
    hp: BindableProperty<number>;
}

export class GameModel extends AbstractModel implements IGameModel {

    public score: BindableProperty<number> = new BindableProperty<number>(0);

    public hp: BindableProperty<number> = new BindableProperty<number>(1);

    protected OnInit(): void { }
}