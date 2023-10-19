import {
  _decorator,
  Component,
  find,
  Label,
  Node,
  tween,
  UIOpacity,
  Vec3,
} from "cc";
import { Ground } from "../components/Ground";
const { ccclass } = _decorator;

@ccclass("Points")
export class Points extends Component {
  private static points = 0;
  private static pointsNode: Node;
  private static pointsLabel: Label;

  private static itemsCount: Label;
  private static isItemPicked: boolean;

  private static finalScoreLabel: Label;
  private static perfect: Node;

  protected onLoad(): void {
    Points.perfect = find("Canvas/perfect");
    Points.pointsNode = this.node;
    Points.pointsLabel = this.node.getComponent(Label);
    Points.finalScoreLabel = find("Canvas/gameOverScreen/score").getComponent(
      Label
    );
    Points.itemsCount = find(
      "Canvas/gameOverScreen/itemsIcon/itemCount"
    ).getComponent(Label);
  }

  static addPoints(value: number) {
    Points.points += value;
    Points.pointsLabel.string = Points.points.toString();

    const newString = `score: ${Points.points.toString()}`;
    Points.finalScoreLabel.string = newString;
  }

  static addItem() {
    if (this.isItemPicked) {
      const newItemsCount = +Points.itemsCount.string + 1;
      Points.itemsCount.string = newItemsCount.toString();
      this.isItemPicked = false;
    }
  }

  static setIsItemPicked(value: boolean) {
    this.isItemPicked = value;
  }

  static resetPoints() {
    this.points = 0;
    this.resetStrings();
    this.itemsCount.string = "0";
  }

  static resetStrings() {
    Points.pointsLabel.string = Points.points.toString();
    Points.finalScoreLabel.string = `score: 0`;
  }

  //showing/hiding points on top
  static setActive(value: boolean) {
    value ? (this.pointsNode.active = true) : (this.pointsNode.active = false);
  }

  static showPerfect() {
    //shows perfect and +1
    const showingTime = 0.8;
    const hidingTIme = 2;
    const perfectOpacity = this.perfect.getComponent(UIOpacity);
    tween(perfectOpacity)
      .to(showingTime, {
        opacity: 255,
      })
      .to(hidingTIme, {
        opacity: 0,
      })
      .start();

    const plusOne = Ground.getNode(2).getChildByName("plusOne");
    const opacity = plusOne.getComponent(UIOpacity);
    const updatedPosition = new Vec3(
      plusOne.position.x,
      plusOne.position.y + 250,
      0
    );

    //moving top
    tween(plusOne)
      .to(showingTime, {
        position: updatedPosition,
      })
      .start();

    tween(opacity)
      .to(showingTime, {
        opacity: 255,
      })
      .to(hidingTIme, {
        opacity: 0,
      })
      .start();
  }
}
