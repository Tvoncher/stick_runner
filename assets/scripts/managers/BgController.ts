import { _decorator, CCInteger, Component, UITransform, Vec3 } from "cc";
import { GameManager, gameState } from "./GameManager";

const { ccclass, property } = _decorator;

@ccclass("BgController")
export class BgController extends Component {
  @property({ type: CCInteger })
  private speed = 30;
  private resetX: number;

  onLoad() {
    const transform = this.node.getComponent(UITransform);
    //reseting bg after its right corner reaches canvas
    this.resetX = -transform.width / 2;
  }

  update(deltaTime: number) {
    if (GameManager.gameState === gameState.running) {
      this.node.setPosition(
        new Vec3(this.node.position.x - this.speed * deltaTime, 0, 0)
      );

      if (this.node.position.x <= this.resetX) {
        this.node.position = Vec3.ONE;
      }
    }
  }
}
