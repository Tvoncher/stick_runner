import { _decorator, Button, Component } from "cc";
import { ChangeSkin } from "../UI/ChangeSkin";
const { ccclass } = _decorator;

@ccclass("StartGame")
export class StartGame extends Component {
  protected onLoad(): void {
    this.node.on(
      Button.EventType.CLICK,
      () => {
        this.node.destroy();
        ChangeSkin.setActive(true);
      },
      this
    );
  }
}
