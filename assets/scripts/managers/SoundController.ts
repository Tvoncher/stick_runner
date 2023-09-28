import { _decorator, AudioSource, Component } from "cc";
const { ccclass } = _decorator;

@ccclass("SoundController")
export class SoundController extends Component {
  private static audioSource: AudioSource;
  private static isPlaying = false;

  protected onLoad(): void {
    SoundController.audioSource = this.node.getComponent(AudioSource);
  }

  static playMusic(value: boolean, name?: string) {
    if (value) {
      if (!this.isPlaying) {
        this.isPlaying = true;
        SoundController.audioSource.play();
      }
    } else {
      this.isPlaying = false;
      SoundController.audioSource.stop();
    }
  }
}
