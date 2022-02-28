export class GameStartEvent {

}

export class GameEndEvent {

}

export class ReturnToStartEvent {

}

export interface CreateEnemyEvent {
    type: number;
    worldPos: cc.Vec2;
}
