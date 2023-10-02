import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  Node,
  tween,
  UITransform,
  Vec2,
  Vec3,
} from "cc";
import { checkSuccess, getDistance } from "../utils/utils";
import { Stick } from "./Stick";
import { CAMERA_SPEED, HERO_INITIAL_POS } from "../consts/consts";
import { Ground } from "./Ground";
import { SoundController, soundName } from "../managers/SoundController";
const { ccclass } = _decorator;

@ccclass("Hero")
export class Hero extends Component {
  static hero: Node;
  static isRunning = false;
  static isReversed = false;
  private static speed = 250;
  private static collider: Collider2D;

  protected onLoad(): void {
    Hero.hero = this.node;

    Hero.collider = this.getComponent(Collider2D);
    Hero.collider.on(Contact2DType.BEGIN_CONTACT, this.pickItem, this);
  }

  static run(distance: number) {
    const posX = Stick.stick.position.x + distance;

    tween(this.hero)
      .to(
        distance / this.speed,
        {
          position: new Vec3(posX, this.hero.position.y, this.hero.position.z),
        },
        { easing: "smooth" }
      )
      .call(() => {
        this.isRunning = false;
        checkSuccess();
      })
      .start();
  }

  static moveWithCamera() {
    //creates illusion of moving camera
    const groundWidth = Ground.getNode(1).getComponent(UITransform).width;
    tween(Hero.hero)
      .to(CAMERA_SPEED, {
        position: new Vec3(
          Ground.getNode(2).position.x - getDistance(),
          HERO_INITIAL_POS.y,
          0
        ),
      })
      .start();
  }

  static dropHero() {
    const dropSpeed = 0.4;
    tween(this.hero)
      .to(dropSpeed, {
        position: new Vec3(this.hero.position.x, this.hero.position.y - 400, 0),
      })
      .call(() => SoundController.playSound(soundName.dying))
      .start();
  }

  static reverseHero() {
    this.isReversed = !this.isReversed;

    this.hero.setScale(
      new Vec3(this.hero.scale.x, this.hero.scale.y * -1, this.hero.scale.z)
    );

    const transfrom = this.hero.getComponent(UITransform);
    transfrom.anchorPoint = new Vec2(1, transfrom.anchorPoint.y * -1);

    const height = transfrom.height;
    this.isReversed
      ? (Hero.collider.offset.y -= height)
      : (Hero.collider.offset.y += height);
  }

  private pickItem(hero: Collider2D, item: Collider2D) {
    const node = item.node;
    if (node) {
      try {
        node.destroy();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
