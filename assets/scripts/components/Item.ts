import {
  _decorator,
  Component,
  instantiate,
  Prefab,
  resources,
  Sprite,
  SpriteFrame,
  UITransform,
  Vec3,
} from "cc";
import { getDistance, getRandomNumber } from "../utils/utils";
import { Ground } from "./Ground";
import { ITEM_POS_Y, itemWidth } from "../consts/consts";
const { ccclass } = _decorator;

@ccclass("Item")
export class Item extends Component {
  static itemPrefab: Prefab;
  private static fruitSpritesArray: SpriteFrame[] = [];

  protected onLoad(): void {
    const fruitsPath = "/images/fruits";

    resources.loadDir(fruitsPath, (err, data) => {
      data.forEach((el) => {
        if (el instanceof SpriteFrame) {
          Item.fruitSpritesArray.push(el);
        }
      });
    });
  }

  static createItem() {
    const item = instantiate(this.itemPrefab);
    const sprite = item.getComponent(Sprite);
    const numOfFruits = Item.fruitSpritesArray.length;
    sprite.spriteFrame =
      Item.fruitSpritesArray[Math.round(getRandomNumber(0, numOfFruits - 1))];

    //calculating item position
    const nextGround = Ground.getNode(3);
    const currentGround = Ground.getNode(2);
    const nextGroundWidth = nextGround.getComponent(UITransform).width;
    const currentGroundWidth = currentGround.getComponent(UITransform).width;

    const distance = getDistance(currentGround, nextGround);

    item.parent = nextGround;
    //offsets to prevent item overlapping ground
    //need to go left from next ground node at least for its width/2 and item width/2
    const minOffset = nextGroundWidth / 2 + itemWidth / 2;
    //going left for whole distance except of half of ground width and item width
    const maxOffset = distance - currentGroundWidth / 2 - itemWidth / 2;

    const posX = getRandomNumber(minOffset, maxOffset);

    item.position = new Vec3(-posX, ITEM_POS_Y, 1);
  }

  static pickItem() {}
}
