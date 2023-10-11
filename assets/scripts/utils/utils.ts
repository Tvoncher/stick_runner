import { find, Node, UITransform } from "cc";
import { Hero } from "../components/Hero";
import { Stick } from "../components/Stick";
import { Ground } from "../components/Ground";
import { Points } from "../UI/Points";
import { GameOver } from "../managers/GameOver";
import { ChangeSkin } from "../UI/ChangeSkin";
import { groundCenterWidth } from "../consts/consts";
import { GameManager, gameState } from "../managers/GameManager";
import { SoundController, soundName } from "../managers/SoundController";
import { Item } from "../components/Item";

export const checkSuccess = () => {
  const stickHeight = Stick.stickHeight;
  const distanceToGroundCenter = getDistance(Stick.stick);
  const stickPosition = Stick.stick.getPosition();

  const nextGroundPosition = Ground.getNode(2).getPosition();
  const nextGroundWidth = Ground.getNode(2).getComponent(UITransform).width;

  const minDistanceBetweenGrounds = Math.abs(
    stickPosition.x - nextGroundPosition.x + nextGroundWidth / 2
  );

  const maxDistanceBetweenGrounds = Math.abs(
    stickPosition.x - nextGroundPosition.x - nextGroundWidth / 2
  );

  //if stick touches ground
  if (
    stickHeight >= minDistanceBetweenGrounds &&
    stickHeight <= maxDistanceBetweenGrounds &&
    !Hero.isReversed
  ) {
    if (
      //stick to center - perfect
      stickHeight >= distanceToGroundCenter - groundCenterWidth / 2 &&
      stickHeight <= distanceToGroundCenter + groundCenterWidth / 2
    ) {
      Points.showPerfect();
      SoundController.playSound(soundName.perfect);
      Points.addPoints(1);
    }
    Hero.moveWithCamera();
    Ground.createGround();
    Item.createItem();
    Ground.moveWithCamera();
    Stick.moveWithCamera();
    Points.addPoints(1);
    Points.addItem();
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
  const firstNodePosition = firstNode.getPosition().x;
  const secondNodePosition = secondNode.getPosition().x;

  const distance = firstNodePosition - secondNodePosition;

  //subtracting to move left
  return -distance;
};
