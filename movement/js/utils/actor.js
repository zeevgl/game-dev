class Shape {
  speedV;
  accV;

  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class Actor extends Shape {
  constructor(name, x, y, width, height, gameWidth, gameHeight) {
    super(name, x, y);
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.speedV = new Vector([0, 0]);
    this.accV = new Vector([0, 0]);
    this.width = width;
    this.height = height;
    this.isFalling = true;
  }

  calcPosition() {
    this.accV.vy += GRAVITY;

    this.speedV.vx += this.accV.vx;
    this.speedV.vy += this.accV.vy;

    this.x += this.speedV.vx;
    this.y += this.speedV.vy;

    if (this.x < 0) {
      this.x = 0;
      this.accV.vx = 0;
    }

    //TODO:change to world boundary

    // if (this.x + this.size > this.gameWidth) {
    //   debugger
    //   this.x = this.gameWidth - this.size;
    // }

    // if (this.y > this.gameHeight - this.size) {
    //   this.y = this.gameHeight - this.size;
    //   this.accV.vy = 0;
    // }
  }

  get boxX() {
    return this.x + this.width;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get boxY() {
    return this.y + this.height;
  }

  update(deltaTime, timestamp) {
    this.calcPosition();
  }

  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
