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
  constructor(
    name,
    x,
    y,
    width,
    height,
    gameWidth,
    gameHeight,
    heath,
    attackDamage
  ) {
    super(name, x, y);
    this.isAlive = true;
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.speedV = new Vector([0, 0]);
    this.accV = new Vector([0, 0]);
    this.width = width;
    this.height = height;

    this.heath = heath;
    this.attackDamage = attackDamage;
  }

  update(deltaTime, timestamp) {
    if (this.isAlive) {
      this.calcPosition();
    }
  }

  draw(ctx) {
    if (this.isAlive) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
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

  takeDamage(damage) {
    this.heath -= damage;
    if (this.heath <= 0) {
      this.isAlive = false;
    }
  }
}
