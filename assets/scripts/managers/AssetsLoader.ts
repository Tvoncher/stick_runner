import { _decorator, Component, Prefab, resources } from "cc";
import { Stick } from "../components/Stick";
import { Ground } from "../components/Ground";
import { Item } from "../components/Item";
const { ccclass } = _decorator;

@ccclass("AssetsLoader")
export class AssetsLoader extends Component {
  protected onLoad(): void {
    const groundPrefabPath = "/prefabs/ground";
    if (!Ground.groundPrefab) {
      resources.load(groundPrefabPath, Prefab, (err, data) => {
        Ground.groundPrefab = data;
      });
    }

    const stickPrefabPath = "/prefabs/stick";
    if (!Stick.stickPrefab) {
      resources.load(stickPrefabPath, Prefab, (err, data) => {
        Stick.stickPrefab = data;
      });
    }

    const itemPrefabPath = "/prefabs/item";
    if (!Item.itemPrefab) {
      resources.load(itemPrefabPath, Prefab, (err, data) => {
        Item.itemPrefab = data;
      });
    }
  }
}
