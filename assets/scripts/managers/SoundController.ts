import { _decorator, AudioClip, AudioSource, Component, resources } from "cc";
const { ccclass } = _decorator;

export const enum soundName {
  perfect = "Perfect",
  growing = "Growing",
  dying = "Dying",
  picking = "Picking",
}

@ccclass("SoundController")
export class SoundController extends Component {
  private static audio: AudioSource;
  private static growing: AudioClip;
  private static perfect: AudioClip;
  private static dying: AudioClip;
  private static picking: AudioClip;

  protected onLoad(): void {
    SoundController.audio = this.node.getComponent(AudioSource);

    resources.load("/sounds/growing", AudioClip, (err, data) => {
      SoundController.growing = data;
    });
    resources.load("/sounds/perfect", AudioClip, (err, data) => {
      SoundController.perfect = data;
    });
    resources.load("/sounds/dying", AudioClip, (err, data) => {
      SoundController.dying = data;
    });
    resources.load("/sounds/picking", AudioClip, (err, data) => {
      SoundController.picking = data;
    });
  }

  static playSound(soundOf: soundName) {
    switch (soundOf) {
      case soundName.growing:
        this.audio.playOneShot(this.growing);
        break;
      case soundName.perfect:
        this.audio.playOneShot(this.perfect);
        break;
      case soundName.dying:
        this.audio.playOneShot(this.dying);
        break;
      case soundName.picking:
        this.audio.playOneShot(this.picking);
        break;
    }
  }
}
