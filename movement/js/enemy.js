class Enemy extends Actor {
  constructor(name, gameWidth, gameHeight, x, y) {
    //randome number between 70 and 100
    const width = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    const height = Math.floor(Math.random() * (110 - 60 + 1)) + 60;

    super(name, x, y, width, height, gameWidth, gameHeight, 1, 5);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([0, 0]);
    this.accV = new Vector([0, 0]);

    this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;

    this.initCollisionBoxes();
  }

  initCollisionBoxes() {
    this.bodyBox = new CollisionBox(
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      'rgba(0,0,255,0.5)'
    );

    this.damageBox = new CollisionBox(
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      'rgba(0,255,0,0.0)'
    );

    this.attackBox = new CollisionBox(
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      'rgba(255,0,0,0.0)'
    );

    this.collisonBoxes = [this.damageBox, this.attackBox, this.bodyBox];
  }

  update(deltaTime, timestamp) {
    this.calcPosition();
    this.collisonBoxes.forEach((box) => {
      box.update(this.x, this.y, deltaTime, timestamp);
    });
  }

  draw(context) {
    this.drawRect(context);
    if (DEBUG_MODE) {
      this.collisonBoxes.forEach((box) => {
        box.draw(context);
      });
    }
  }

  drawRect(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
