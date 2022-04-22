class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.size = 150;

    this.vx = 0;
    this.vy = 30;
    this.vyAcc = 0;

    this.maxVx = 30;
    this.maxVy = -50;

    this.img = new Image();
    this.img.src = '../assets/Adventurer/adventurer-Sheet.png';
    this.imageFrame = 0;
    this.tick = 0;
    this.initPlayer();
  }

  initPlayer() {
    this.y = this.gameHeight - this.size;
  }

  update(deltaTime, timestamp) {
    this.tick++;
    if (this.tick % 10 == 0) {
      this.imageFrame++;
      if (this.imageFrame >= 3) {
        this.imageFrame = 0;
      }
      this.tick = 0;
    }

    this.updatePosition(deltaTime);
  }

  draw(ctx) {
    this.drawRect();
    this.drawSprite();
  }

  drawRect() {
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(150, 20, 50, 150);
  }

  drawSprite() {
    const sprite = new Sprite(
      this.img,
      50,
      37,
      [
        // specify a few sprite locations
        [0, 0], // idel
        [50, 0], // green
        [50, 37], // green
      ],
      this.size
    );

    sprite.draw(this.imageFrame, this.x, this.y);
  }

  updatePosition(deltaTime) {
    this.vyAcc += GRAVITY;

    this.x += this.vx;
    //this.y += this.vy * this.vyAcc;
    // const newSpeed = deltaTime * this.vyAcc;
    // this.y += deltaTime * this.vyAcc;
    // console.log(this.y, newSpeed, this.vyAcc);

    this.y += this.vyAcc;

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x + this.size > this.gameWidth) {
      this.x = this.gameWidth - this.size;
    }

    if (this.y > this.gameHeight - this.size) {
      this.y = this.gameHeight - this.size;
    }
  }

  moveLeft() {
    this.vx = -this.maxVx;
  }

  moveRight() {
    this.vx = this.maxVx;
  }

  stop() {
    this.vx = 0;
  }

  jump() {
    this.vyAcc = - this.size / 8;
  }
}
