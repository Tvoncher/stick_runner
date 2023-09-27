import { _decorator, Component, Prefab, resources } from "cc";
import { Stick } from "../components/Stick";
import { Ground } from "../components/Ground";
const { ccclass } = _decorator;

@ccclass("AssetsLoader")
export class AssetsLoader extends Component {
  protected onLoad(): void {
    //loading ground
    const groundPrefabPath = "/prefabs/ground";
    if (!Ground.groundPrefab) {
      resources.load(groundPrefabPath, Prefab, (err, data) => {
        Ground.groundPrefab = data;
      });
    }

    //loading stick
    const stickPrefabPath = "/prefabs/stick";
    if (!Stick.stickPrefab) {
      resources.load(stickPrefabPath, Prefab, (err, data) => {
        Stick.stickPrefab = data;
      });
    }
  }
}
