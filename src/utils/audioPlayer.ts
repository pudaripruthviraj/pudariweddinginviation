// Robust Audio Player for Ritviz - Sage with Autoplay-Policy Bypass & State Sync
import sageMusicUrl from '../assets/audio/ritviz_sage.mp3';

type AudioListener = (isPlaying: boolean) => void;

class WeddingMusicPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<AudioListener> = new Set();
  private primaryUrl: string = sageMusicUrl;
  private fallbackUrl: string = '/audio/ritviz_sage.mp3';

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    try {
      this.audio = new Audio();
      this.audio.src = this.primaryUrl;
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.85;

      this.audio.addEventListener('playing', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });

      this.audio.addEventListener('error', () => {
        // Fallback to static public path if asset bundle path had an issue
        if (this.audio && this.audio.src !== this.fallbackUrl) {
          this.audio.src = this.fallbackUrl;
          this.audio.load();
        }
      });
    } catch (err) {
      console.warn('Audio initialization restricted:', err);
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.isPlaying);
      } catch {
        // ignore
      }
    });
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start(): Promise<boolean> {
    this.initAudio();

    if (!this.audio) {
      return Promise.resolve(false);
    }

    // Try starting playback
    return this.audio.play()
      .then(() => {
        this.isPlaying = true;
        this.notifyListeners();
        return true;
      })
      .catch((err) => {
        console.warn('Audio playback error (will retry on user gesture):', err);
        this.isPlaying = false;
        this.notifyListeners();
        return false;
      });
  }

  public stop() {
    if (this.audio) {
      try {
        this.audio.pause();
      } catch {
        // ignore
      }
    }
    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return Promise.resolve(false);
    } else {
      return this.start();
    }
  }

  public setVolume(val: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, val));
    }
  }
}

export const weddingMusic = new WeddingMusicPlayer();
