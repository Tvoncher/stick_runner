import {
  _decorator,
  Component,
  find,
  instantiate,
  Node,
  Prefab,
  tween,
  UITransform,
  Vec3,
} from "cc";
import { findPrefabs, getDistance, getRandomNumber } from "../utils/utils";
import { CAMERA_SPEED, GROUND_POS_Y } from "../consts/consts";
import { GameManager, gameState } from "../managers/GameManager";

const { ccclass } = _decorator;

@ccclass("Ground")
export class Ground extends Component {
  static groundPrefab: Prefab;
  static groundArray: Node[];
  private static groundWidth = { min: 50, max: 180 };

  protected onLoad(): void {
    Ground.groundArray = findPrefabs("ground");
  }

  static createGround() {
    const ground = instantiate(this.groundPrefab);
    ground.getComponent(UITransform).width = getRandomNumber(
      this.groundWidth.min,
      this.groundWidth.max
    );
    const posX = getRandomNumber(-40, 240);
    ground.position.set(new Vec3(posX + getDistance(), GROUND_POS_Y, 0));
    ground.parent = find("Canvas");
    Ground.groundArray.push(ground);
  }

  static getNode(value: number) {
    return Ground.groundArray[value];
  }

  static changeGroundWidth(min: number, max: number) {
    this.groundWidth.min = min;
    this.groundWidth.max = max;
  }

  //creates illusion of moving camera
  static moveWithCamera() {
    this.groundArray.forEach((node, index) => {
      const offset = 10;
      const startingPosition = -237;
      let newPositionX = node.position.x;

      if (index === 1) {
        newPositionX -= getDistance();
      } else if (index === 2) {
        newPositionX = startingPosition;
      } else if (index === 3) {
        newPositionX = node.position.x - getDistance();
      }

      tween(node)
        .to(CAMERA_SPEED, {
          position: new Vec3(newPositionX + offset, node.position.y, 0),
        })
        .call(() => GameManager.setGameState(gameState.waiting))
        .start();
    });
  }
}
