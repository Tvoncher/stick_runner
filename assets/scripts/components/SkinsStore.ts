import { _decorator, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Store")
export class Store extends Component {
  @property({ type: Node })
  closeButton: Node;

  private startingPos = Vec3.ZERO;
  private hidingPos = new Vec3(0, 1280, 1);

  openWindow() {
    this.node.active = true;
    this.animateWindow(this.startingPos);
  }

  closeWindow() {
    this.animateWindow(this.hidingPos);
  }

  private animateWindow(position: Vec3) {
    tween(this.node)
      .to(
        0.4,
        {
          position: position,
        },
        { easing: "smooth" }
      )
      .call(() => {
        if (position === this.hidingPos) {
          this.node.active = false;
        }
      })
      .start();
  }
}
