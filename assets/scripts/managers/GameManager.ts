import { _decorator, Component } from "cc";
import { Stick } from "../components/Stick";
import { Hero } from "../components/Hero";

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
}
