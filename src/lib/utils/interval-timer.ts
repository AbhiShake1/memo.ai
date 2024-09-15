export class IntervalTimer {
  callbackStartTime: number = 0;
  remaining: number = 0;
  paused: boolean = false;
  timerId: NodeJS.Timeout | null = null;
  private _callback: () => void;
  private _delay: number;

  constructor(callback: () => void, delay: number) {
    this._callback = callback;
    this._delay = delay;
  }

  pause(): void {
    if (!this.paused) {
      this.clear();
      this.remaining = new Date().getTime() - this.callbackStartTime;
      this.paused = true;
    }
  }

  resume(): void {
    if (this.paused) {
      if (this.remaining) {
        setTimeout(() => {
          this.run();
          this.paused = false;
          this.start();
        }, this.remaining);
      } else {
        this.paused = false;
        this.start();
      }
    }
  }

  clear(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  start(): void {
    this.clear();
    this.timerId = setInterval(() => {
      this.run();
    }, this._delay);
  }

  run(): void {
    this.callbackStartTime = new Date().getTime();
    this._callback();
  }
}
