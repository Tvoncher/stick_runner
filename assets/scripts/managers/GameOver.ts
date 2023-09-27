import { _decorator, Button, Component, find, tween, UIOpacity } from "cc";
import { GameManager, gameState } from "./GameManager";
import { Hero } from "../components/Hero";
import { HERO_INITIAL_POS } from "../consts/consts";
import { Stick } from "../components/Stick";
import { Points } from "../UI/Points";
import { ChangeSkin } from "../UI/ChangeSkin";
const { ccclass } = _decorator;

@ccclass("GameOver")
export class GameOver extends Component {
  static gameOver = false;

  protected onLoad(): void {
    this.node.active = false;

    this.node.on(
      Button.EventType.CLICK,
      () => {
        this.restartGame();
      },
      this
    );
  }

  restartGame() {
    this.node.active = false;
    this.node.getComponent(UIOpacity).opacity = 0;
    GameManager.setGameState(gameState.waiting);
    Hero.hero.position = HERO_INITIAL_POS;
    Stick.destroy();
    Stick.resetHeight();
    Points.resetPoints();
    Points.setActive(true);
    ChangeSkin.setActive(true);
  }

  static setGameOver() {
    const node = find("Canvas/gameOverScreen");
    const opacity = node.getComponent(UIOpacity);

    node.active = true;
    tween(opacity).to(0.8, { opacity: 255 }).start();
  }
}
