import {
  _decorator,
  Component,
  find,
  Node,
  Sprite,
  SpriteFrame,
  tween,
  Vec3,
  CCInteger,
  Button,
} from "cc";
import { Hero } from "../components/Hero";
import { getRandomNumber } from "../utils/utils";
const { ccclass, property } = _decorator;

@ccclass("ChangeSkin")
export class ChangeSkin extends Component {
  @property({ type: SpriteFrame })
  heroSprite1: SpriteFrame;
  @property({ type: SpriteFrame })
  heroSprite2: SpriteFrame;
  @property({ type: SpriteFrame })
  heroSprite3: SpriteFrame;
  @property({ type: CCInteger })
  numberOfSkins = 3;

  protected onLoad(): void {
    this.node.on(
      Button.EventType.CLICK,
      () => {
        this.playAnimation();
        this.changeHeroSkin();
      },
      this
    );
  }

  private changeHeroSkin() {
    const spritesArr = [this.heroSprite1, this.heroSprite2, this.heroSprite3];
    const sprite = Hero.hero.getComponent(Sprite);

    const index = Math.round(getRandomNumber(0, this.numberOfSkins - 1));
    //dont wanna hardcode or write long function here. So for now, let it be recursive
    sprite.spriteFrame === spritesArr[index]
      ? this.changeHeroSkin()
      : (sprite.spriteFrame = spritesArr[index]);
  }

  private playAnimation() {
    tween(this.node)
      .to(0.2, { scale: new Vec3(1.2, 1.2, 1) }, { easing: "smooth" })
      .to(0.2, { scale: Vec3.ONE }, { easing: "smooth" })
      .start();
  }

  static setActive(value: boolean) {
    const button = find("Canvas/changeButton");
    value ? (button.active = true) : (button.active = false);
  }
}
