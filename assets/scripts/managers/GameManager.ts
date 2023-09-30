import { _decorator, Component } from "cc";
import { Stick } from "../components/Stick";
import { Hero } from "../components/Hero";
import { Ground } from "../components/Ground";

const { ccclass } = _decorator;
export const enum gameState {
  waiting = "Waiting",
  growing = "Growing",
  running = "Running",
  ending = "Ending",
}

@ccclass("GameManager")
export class GameManager extends Component {
  static gameState = gameState.waiting;

  static setGameState(value: gameState) {
    this.gameState = value;

    if (this.gameState === gameState.growing) {
      Stick.createStick();
    }

    if (this.gameState === gameState.running) {
      Hero.isRunning = true;
      Stick.pushStick(-90);
    }
  }

  static enableHardMode(value: boolean) {
    if (value) {
      Stick.setGrowthSpeed(30);
      Ground.changeGroundWidth(40, 90);
    } else {
      Stick.setGrowthSpeed(50);
      Ground.changeGroundWidth(50, 180);
    }
  }
}
