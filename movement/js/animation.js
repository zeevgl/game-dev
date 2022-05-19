class Animation {
  constructor(sprite, startIndex, endIndex, loop, onComplete) {
    this.sprite = sprite;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.loop = loop;
    this.onComplete = onComplete;

    this.imageFrame = null;
    this.isRunning = false;
    this.totalDt = 0;

    this.frameDuration = 160; //ms
  }

  update(dt, timestamp) {
    if (!this.isRunning) {
      return;
    }

    this.totalDt += dt;

    if (this.totalDt >= this.frameDuration) {
      this.imageFrame++;
      if (this.imageFrame === this.endIndex) {
        if (this.loop) {
          this.imageFrame = this.startIndex;
        } else {
          this.stop();
          this.onComplete?.();
        }
      }
      this.totalDt = 0;
    }
  }

  draw(canvas, x, y) {
    this.sprite.draw(this.imageFrame, x, y);
  }

  start() {
    this.imageFrame = this.startIndex;
    this.totalDt = 0;
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }
}
