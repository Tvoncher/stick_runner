import { _decorator, Button, Color, Component, Sprite } from "cc";
import { ChangeSkin } from "../UI/ChangeSkin";
import { GameManager } from "./GameManager";
const { ccclass } = _decorator;

@ccclass("StartGame")
export class StartGame extends Component {
  private isHardEnabled = false;

  protected onLoad(): void {
    this.node.on(
      Button.EventType.CLICK,
      () => {
        this.node.destroy();
        ChangeSkin.setActive(true);
      },
      this
    );

    this.node.getChildByName("hardMode").on(
      Button.EventType.CLICK,
      () => {
        if (this.isHardEnabled) {
          GameManager.enableHardMode(false);
          this.changeButton(false);
          this.isHardEnabled = false;
        } else {
          GameManager.enableHardMode(true);
          this.changeButton(true);
          this.isHardEnabled = true;
        }
      },
      this
    );
  }

  private changeButton(isHard: boolean) {
    const buttonSprite = this.node
      .getChildByName("hardMode")
      .getComponent(Sprite);

    isHard
      ? (buttonSprite.color = Color.RED)
      : (buttonSprite.color = Color.GREEN);
  }
}
