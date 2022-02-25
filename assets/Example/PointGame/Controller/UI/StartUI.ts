import { IArchitecture } from "../../../../QFramework/Architecture/Architecture";
import { AbstractController } from "../../../../QFramework/Architecture/IController";
import { StartGameCommand } from "../../Command/StartGameCommand";
import { PointGameApp } from "../../PointGameApp";

const { ccclass, property } = cc._decorator;

@ccclass
export class StartUI extends AbstractController {

    private onStartBtnClick(): void {
        this.SendCommand(new StartGameCommand());
    }

    protected GetArchitecture(): IArchitecture {
        return PointGameApp.Interface;
    }
}
