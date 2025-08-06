declare module 'howler' {
  export class Howl {
    constructor(options: HowlOptions);
    play(spriteOrId?: string | number): number;
    pause(id?: number): Howl;
    stop(id?: number): Howl;
    mute(mute?: boolean, id?: number): Howl;
    volume(volume?: number, id?: number): Howl;
    fade(from: number, to: number, duration: number, id?: number): Howl;
    rate(rate: number, id?: number): Howl;
    seek(seek?: number, id?: number): number | Howl;
    loop(loop?: boolean, id?: number): Howl;
    playing(id?: number): boolean;
    duration(id?: number): number;
    state(): 'unloaded' | 'loading' | 'loaded';
    unload(): void;
    
    // Event listeners
    on(event: string, callback: (id?: number) => void, id?: number): Howl;
    once(event: string, callback: (id?: number) => void, id?: number): Howl;
    off(event?: string, callback?: (id?: number) => void, id?: number): Howl;
  }

  export class Howler {
    static mute(muted: boolean): void;
    static volume(volume?: number): number;
    static stop(): void;
    static unload(): void;
    static noAudio: boolean;
    static usingWebAudio: boolean;
    static html5PoolSize: number;
    static ctx: AudioContext;
    static masterGain: GainNode;
  }

  interface HowlOptions {
    src: string | string[];
    volume?: number;
    html5?: boolean;
    loop?: boolean;
    preload?: boolean | 'metadata' | 'auto';
    autoplay?: boolean;
    mute?: boolean;
    rate?: number;
    pool?: number;
    format?: string[];
    xhr?: {
      method?: string;
      headers?: Record<string, string>;
      withCredentials?: boolean;
    };
    onload?: () => void;
    onloaderror?: (id: number, error: any) => void;
    onplay?: (id: number) => void;
    onend?: (id: number) => void;
    onpause?: (id: number) => void;
    onstop?: (id: number) => void;
    onmute?: (id: number) => void;
    onvolume?: (id: number) => void;
    onrate?: (id: number) => void;
    onseek?: (id: number) => void;
    onfade?: (id: number) => void;
  }
}