import { _decorator, Component } from "cc";
import { Ground } from "../components/Ground";
const { ccclass } = _decorator;

@ccclass("GarbageCollector")
export class GarbageCollector extends Component {
  protected update(): void {
    if (Ground.groundArray.length >= 4) {
      const firstInstance = Ground.groundArray.splice(0, 1);
      firstInstance[0].destroy();
    }
  }
}
