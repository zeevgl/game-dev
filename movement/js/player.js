class Player extends Actor {
  constructor(name, gameWidth, gameHeight) {
    const size = 150;

    super(name, 0, 0, size, size, gameWidth, gameHeight);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([10, 30]);
    this.accV = new Vector([0, 0]);

    this.size = size;

    this.initPlayer();
    this.initSprite(size);
  }

  initPlayer() {
    this.y = this.gameHeight - this.size;
  }

  initSprite(size) {
    this.imageFrame = 0;
    this.tick = 0;
    
    const img = new Image();
    img.src = '../assets/Adventurer/adventurer-Sheet.png';

    this.sprite = new Sprite(
      img,
      50,
      37,
      [
        // specify a few sprite locations
        [0, 0], // idel
        [50, 0], // pos1
        [50, 37], // pos2
      ],
      size
    );
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

    this.calcPosition();
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
    this.sprite.draw(this.imageFrame, this.x, this.y);
  }

  moveLeft() {
    this.accV.vx = -3;
  }

  moveRight() {
    this.accV.vx = 3;
  }

  stop() {
    this.accV.vx = 0;
  }

  jump() {
    if (this.accV.vy === 0) {
      this.accV.vy = -6;
    }
  }
}
