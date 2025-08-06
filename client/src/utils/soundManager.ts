import { Howl, Howler } from 'howler';

type SoundKey = 'rain' | 'cafe' | 'waves' | 'alarm';

type SoundAsset = {
  name: SoundKey;
  path: string;
  volume?: number;
  loop?: boolean;
};

export class SoundManager {
  private static instance: SoundManager | null = null;
  private sounds: Partial<Record<SoundKey, Howl>> = {};

  private constructor() {
    this.initializeDefaultSounds();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initializeDefaultSounds(): void {
    this.preloadSounds([
      { name: 'rain', path: '/sounds/rain.mp3', loop: true, volume: 0.5 },
      { name: 'cafe', path: '/sounds/cafe.mp3', loop: true, volume: 0.5 },
      { name: 'waves', path: '/sounds/waves.mp3', loop: true, volume: 0.5 },
      { name: 'alarm', path: '/sounds/alarm.mp3', loop: false, volume: 0.7 }
    ]);
  }

  preloadSounds(soundAssets: SoundAsset[]): void {
    soundAssets.forEach(asset => {
      // Only create if not already exists
      if (!this.sounds[asset.name]) {
        this.sounds[asset.name] = new Howl({
          src: [asset.path],
          volume: asset.volume ?? 0.5, // Default volume if not provided
          loop: asset.loop ?? false,   // Default to not looping
          preload: true,
          onloaderror: () => console.error(`Failed to load sound: ${asset.name}`)
        });
      }
    });
  }

  play(name: SoundKey): number | null {
    if (!this.sounds[name]) {
      console.warn(`Sound ${name} not found`);
      return null;
    }
    return this.sounds[name]?.play() ?? null;
  }

  stop(name?: SoundKey): void {
    if (name) {
      this.sounds[name]?.stop();
    } else {
      Howler.stop();
    }
  }

  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(clampedVolume);
  }

  isPlaying(name: SoundKey): boolean {
    return !!this.sounds[name]?.playing();
  }

  toggle(name: SoundKey): void {
    if (this.isPlaying(name)) {
      this.stop(name);
    } else {
      this.play(name);
    }
  }

  unload(): void {
    Object.values(this.sounds).forEach(sound => sound?.unload());
    this.sounds = {};
    SoundManager.instance = null;
  }
}

// Pre-configured instance export
export const soundManager = SoundManager.getInstance();