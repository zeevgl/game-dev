class Animation {
  constructor(sprite, startIndex, endIndex, loop, onComplete) {
    this.sprite = sprite;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.loop = loop;
    this.onComplete = onComplete;

    this.tick = null;
    this.imageFrame = null;
    this.isRunning = false;
  }

  update(deltaTime, timestamp) {
    if (!this.isRunning) {
      return;
    }

    this.tick++;
    if (this.tick % 10 == 0) {
      this.imageFrame++;
      if (this.imageFrame === this.endIndex) {
        if (this.loop) {
          this.imageFrame = this.startIndex;
        } else {
          this.stop();
          this.onComplete?.();
        }
      }
      this.tick = 0;
    }
  }

  draw(canvas, x, y) {
    this.sprite.draw(this.imageFrame, x, y);
  }

  start() {
    this.imageFrame = this.startIndex;
    this.tick = 0;
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }
}
