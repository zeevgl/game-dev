class Player extends Actor {
  constructor(name, gameWidth, gameHeight) {
    const size = PLAYER_SIZE;

    super(name, 0, 0, size, size, gameWidth, gameHeight);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([2, 30]);
    this.accV = new Vector([0, 0]);

    this.size = size;

    this.preperingToJump = false;
    this.additionalJumpingSpeed = 0;
    this.maxAdditionalJumpingSpeed = 0.4;

    this.initSprite(size);
    this.initPlayer();
  }

  initPlayer() {
    //this.y = this.gameHeight - this.size;
    this.direction = PlayerDirection.RIGHT;
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

    const left = getSpritePositions(
      50,
      37,
      this.size,
      7,
      11,
      '../assets/Adventurer/adventurer-Sheet-left.png'
    );

    this.spriteRight = sprite;
    this.spriteLeft = left.sprite;
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

    if (this.preperingToJump) {
      this.additionalJumpingSpeed += 0.02;
    }

    if (this.additionalJumpingSpeed > this.maxAdditionalJumpingSpeed) {
      this.additionalJumpingSpeed = this.maxAdditionalJumpingSpeed;
    }

    this.calcPosition();
  }

  draw(canvas) {
    if (this.direction === PlayerDirection.RIGHT) {
      this.spriteRight.draw(this.imageFrame, this.x, this.y);
    } else {
      this.spriteLeft.draw(this.imageFrame, this.x, this.y);
    }
  }

  drawRect() {
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(150, 20, 50, 150);
  }

  moveLeft() {
    this.direction = PlayerDirection.LEFT;
    this.setState(PlayerStates.RUN);
    this.accV.vx = -3;
  }

  moveRight() {
    this.direction = PlayerDirection.RIGHT;
    this.setState(PlayerStates.RUN);
    this.accV.vx = 3;
  }

  stop() {
    this.setState(PlayerStates.IDLE);
    this.accV.vx = 0;
  }

  wantToJump() {
    if (this.accV.vy === 0) {
      this.preperingToJump = true;
    }
  }

  jump() {
    if (this.accV.vy === 0) {
      this.preperingToJump = false;
      this.accV.vy = -this.size * 0.013 - this.additionalJumpingSpeed;
      this.additionalJumpingSpeed = 0;
    }
  }

  useSword() {
    this.setState(PlayerStates.SWORD);
    //TODO:Zeev: continue from here. make this annimation run only once
  }
}
