import { Howl, Howler } from 'howler';

type SoundAsset = {
  name: string;
  path: string;
  volume?: number;
  loop?: boolean;
};

export class SoundManager {
  private static instance: SoundManager;
  private sounds: Record<string, Howl> = {};

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  preloadSounds(soundAssets: SoundAsset[]) {
    soundAssets.forEach(asset => {
      this.sounds[asset.name] = new Howl({
        src: [asset.path],
        volume: asset.volume || 0.5,
        loop: asset.loop || false,
        preload: true
      });
    });
  }

  play(name: string) {
    if (this.sounds[name]) {
      this.sounds[name].play();
    }
  }

  stop(name?: string) {
    if (name) {
      this.sounds[name]?.stop();
    } else {
      Howler.stop();
    }
  }

  setVolume(volume: number) {
    Howler.volume(volume);
  }
}

// Example usage:
// const soundManager = SoundManager.getInstance();
// soundManager.preloadSounds([
//   { name: 'rain', path: '/sounds/rain.mp3', loop: true }
// ]);