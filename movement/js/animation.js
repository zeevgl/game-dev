class Animation {
    //constructor(spriteSheet, frameDuration, frames, loop, reverse) {
    constructor(sprite, startIndex, endIndex, loop) {
        this.sprite = sprite;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.loop = loop;
        this.tick = 0;
        this.imageFrame = startIndex;
    }

    update(deltaTime, timestamp) {
        this.tick++;
        if (this.tick % 10 == 0) {
            this.imageFrame++;
            if (this.imageFrame >= this.endIndex) {
                this.imageFrame = this.startIndex;
            }
            this.tick = 0;
        }
    }

    draw(canvas, x, y) {
        this.sprite.draw(this.imageFrame, x, y);
    }

    start() {
        // this.state = state;
        // this.imageFrame = PlayerSprites[this.state].start;
        // this.tick = 0;
    }

    stop() {

    }
}