class Player extends Actor {
  constructor(name, gameWidth, gameHeight) {
    const size = PLAYER_SIZE;

    super(name, 0, 0, size, size, gameWidth, gameHeight);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([2, 30]);
    this.accV = new Vector([0, 0]);

    this.size = size;

    this.initSprite(size);
    this.initPlayer();
  }

  initPlayer() {
    this.y = this.gameHeight - this.size;
    this.setState(PlayerStates.IDLE);
  }

  initSprite(size) {
    const { positions, sprite } = getSpritePositions(
      50,
      37,
      this.size,
      7,
      11,
      '../assets/Adventurer/adventurer-Sheet.png'
    );
    this.sprite = sprite;
    this.positions = positions;
  }

  setState(state) {
    if (this.state !== state) {
      this.state = state;
      this.imageFrame = SpriteStates[this.state].start;
      this.tick = 0;
    }
  }

  update(deltaTime, timestamp) {
    this.tick++;
    if (this.tick % 10 == 0) {
      this.imageFrame++;
      if (this.imageFrame >= SpriteStates[this.state].end) {
        this.imageFrame = SpriteStates[this.state].start;
      }
      this.tick = 0;
    }

    this.calcPosition();
  }

  draw(canvas) {
    //this.drawRect();
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
    this.setState(PlayerStates.RUN);
    this.accV.vx = -3;
  }

  moveRight() {
    this.setState(PlayerStates.RUN);
    this.accV.vx = 3;
  }

  stop() {
    this.setState(PlayerStates.IDLE);
    this.accV.vx = 0;
  }

  jump() {
    if (this.accV.vy === 0) {
      this.accV.vy = -this.size * 0.013; //-1.5;
    }
  }
}
