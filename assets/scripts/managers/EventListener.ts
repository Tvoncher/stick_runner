import { _decorator, Component, Node } from "cc";
import { Stick } from "../components/Stick";
import { GameManager, gameState } from "./GameManager";

const { ccclass } = _decorator;

@ccclass("EventListener")
export class EventListener extends Component {
  protected onLoad(): void {
    this.node.on(
      Node.EventType.TOUCH_START,
      () => {
        if (GameManager.gameState === gameState.waiting) {
          Stick.setIsMouseDown(true);
          GameManager.setGameState(gameState.growing);
        }
      },
      this
    );

    this.node.on(
      Node.EventType.TOUCH_END,
      () => {
        Stick.setIsMouseDown(false);
      },
      this
    );
  }
}
