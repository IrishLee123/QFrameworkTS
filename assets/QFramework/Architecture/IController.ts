import { ICanGetModel } from "./Rule/ICanGetModel";

export interface IController extends ICanGetModel, ICanGetSystem, ICanSendCommand, ICanRegisterEvent {
}

export abstract class AbstractController implements IController {

}