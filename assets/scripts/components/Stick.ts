import {
  _decorator,
  Component,
  find,
  instantiate,
  Node,
  Prefab,
  Quat,
  Size,
  tween,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
import { Hero } from "./Hero";
import { GameManager, gameState } from "../managers/GameManager";
import { Ground } from "./Ground";
import {
  CAMERA_SPEED,
  GROUND_HEIGHT,
  GROUND_POS_Y,
  groundCenterWidth,
  STICK_WIDTH,
} from "../consts/consts";
import { getDistance } from "../utils/utils";
import { SoundController, soundName } from "../managers/SoundController";

const { ccclass } = _decorator;

@ccclass("Stick")
export class Stick extends Component {
  private static isMouseDown = false;
  private static growthInterval: number;
  private static growthSpeed = 50;
  static stick: Node;
  static stickHeight: number = 0;
  static stickPrefab: Prefab;

  static setIsMouseDown(value: boolean) {
    this.isMouseDown = value;
  }

  static createStick() {
    this.stick = instantiate(this.stickPrefab);
    this.stick.getComponent(UITransform).anchorPoint = Vec2.ZERO;
    this.stick.parent = find("Canvas");

    const groundNode = Ground.getNode(1);
    const groundWidth = groundNode.getComponent(UITransform).width;
    const posX = groundNode.getPosition().x + groundWidth / 2 - STICK_WIDTH / 2;
    const posY = GROUND_POS_Y + GROUND_HEIGHT / 2;

    const stickPosition = new Vec3(posX, posY, 0);
    this.stick.setPosition(stickPosition);

    this.growthInterval = setInterval(() => {
      const growthSize = 15;
      this.stickHeight += growthSize;
    }, this.growthSpeed);
  }

  static growStick() {
    const transform = this.stick.getComponent(UITransform);
    transform.contentSize = new Size(STICK_WIDTH, this.stickHeight);
  }

  static pushStick(degrees: number) {
    clearInterval(this.growthInterval);

    const quat: Quat = new Quat();
    Quat.fromEuler(quat, 0, 0, degrees);
    tween(this.stick)
      .to(
        0.6,
        {
          rotation: quat,
        },
        { easing: "cubicOut" }
      )
      .call(() => {
        const stickRotation = this.stick.rotation.getEulerAngles(new Vec3()).z;
        // make hero run if stick is horizontal
        if (stickRotation === -90) {
          Hero.run(Stick.stickHeight);
        }
      })
      .start();
  }

  static destroy() {
    const stick = find("Canvas/stick");
    stick.destroy();
  }

  static moveWithCamera() {
    tween(this.stick)
      .to(CAMERA_SPEED, {
        position: new Vec3(
          this.stick.getPosition().x - getDistance(),
          this.stick.getPosition().y,
          0
        ),
      })
      .call(() => {
        this.createPseudoStick();
        this.destroy();
        this.resetHeight();
      })
      .start();
  }

  static createPseudoStick() {
    //need this to show 'stick' during ending phase
    const pseudoStick = instantiate(this.stickPrefab);
    pseudoStick.getComponent(UITransform).anchorPoint = Vec2.ZERO;
    pseudoStick.parent = Ground.getNode(1);
    const transform = pseudoStick.getComponent(UITransform);
    const height = this.stickHeight;
    transform.contentSize = new Size(height, STICK_WIDTH);
    const posX = -height - groundCenterWidth / 2;
    const posY = GROUND_HEIGHT / 2 - STICK_WIDTH;
    pseudoStick.position = new Vec3(posX, posY, 1);
  }

  static resetHeight() {
    this.stickHeight = 0;
  }

  static setGrowthSpeed(value: number) {
    this.growthSpeed = value;
  }

  protected update(): void {
    if (GameManager.gameState === gameState.growing) {
      switch (Stick.isMouseDown) {
        case true:
          Stick.growStick();
          SoundController.playSound(soundName.growing);
          break;

        case false:
          if (!Hero.isRunning) {
            GameManager.setGameState(gameState.running);
            SoundController.playSound(soundName.growing);
          }
          break;
      }
    }
  }
}
