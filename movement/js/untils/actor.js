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
  }

  calcPosition() {
    this.accV.vy += GRAVITY;

    this.x += this.speedV.vx * this.accV.vx;
    this.y += this.speedV.vy * this.accV.vy;

    if (this.x < 0) {
      this.x = 0;
      this.accV.vx = 0;
    }

    //TODO:change to world boundary 

    // if (this.x + this.size > this.gameWidth) {
    //   debugger
    //   this.x = this.gameWidth - this.size;
    // }

    if (this.y > this.gameHeight - this.size) {
      this.y = this.gameHeight - this.size;
      this.accV.vy = 0;
    }
  }

  get boxX() {
    return this.x + this.width;
  }

  get boxY() {
    return this.y + this.width;
  }

  update(deltaTime, timestamp) {
    this.calcPosition();
  }

  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
