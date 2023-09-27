import { find, Node, UITransform } from "cc";
import { Hero } from "../components/Hero";
import { Stick } from "../components/Stick";
import { Ground } from "../components/Ground";
import { Points } from "../UI/Points";
import { GameOver } from "../managers/GameOver";
import { ChangeSkin } from "../UI/ChangeSkin";
import { groundCenterWidth } from "../consts/consts";
import { GameManager, gameState } from "../managers/GameManager";

export const checkSuccess = () => {
  const stickHeight = Stick.stickHeight;
  const distanceToGroundCenter = getDistance(Stick.stick);

  const minDistanceBetweenGrounds = Math.abs(
    Stick.stick.position.x -
      Ground.getNode(2).position.x +
      Ground.getNode(2).getComponent(UITransform).width / 2
  );

  const maxDistanceBetweenGrounds = Math.abs(
    Stick.stick.position.x -
      Ground.getNode(2).position.x -
      Ground.getNode(2).getComponent(UITransform).width / 2
  );

  //if stick touches ground
  if (
    stickHeight >= minDistanceBetweenGrounds &&
    stickHeight <= maxDistanceBetweenGrounds
  ) {
    if (
      //stick to center - perfect
      stickHeight >= distanceToGroundCenter - groundCenterWidth / 2 &&
      stickHeight <= distanceToGroundCenter + groundCenterWidth / 2
    ) {
      Points.showPerfect();
      Points.addPoints(1);
    }
    Hero.moveWithCamera();
    Ground.createGround();
    Ground.moveWithCamera();
    Stick.moveWithCamera();
    Points.addPoints(1);
  } else {
    GameManager.setGameState(gameState.waiting);
    Stick.pushStick(-180);
    Hero.dropHero();
    GameOver.setGameOver();
    Points.setActive(false);
    ChangeSkin.setActive(false);
  }
};

export const findPrefabs = (name: string) => {
  const canvas = find("Canvas");
  const res: Node[] = canvas.children.filter((node) => node.name === name);

  return res;
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const getDistance = (
  firstNode: Node = Ground.getNode(1),
  secondNode: Node = Ground.getNode(2)
) => {
  const firstNodePosition = firstNode.position.x;
  const secondNodePosition = secondNode.position.x;

  const distance = firstNodePosition - secondNodePosition;

  //subtracting to move left
  return -distance;
};
