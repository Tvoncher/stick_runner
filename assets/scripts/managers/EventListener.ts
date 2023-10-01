import { _decorator, Component, Node } from "cc";
import { Stick } from "../components/Stick";
import { GameManager, gameState } from "./GameManager";
import { Hero } from "../components/Hero";

const { ccclass } = _decorator;

@ccclass("EventListener")
export class EventListener extends Component {
  protected onLoad(): void {
    this.node.on(
      Node.EventType.TOUCH_START,
      () => {
        switch (GameManager.gameState) {
          case gameState.waiting:
            Stick.setIsMouseDown(true);
            GameManager.setGameState(gameState.growing);
            break;

          case gameState.running:
            Hero.reverseHero();
            break;
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
