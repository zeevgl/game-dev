class Player extends Actor {
  constructor(name, gameWidth, gameHeight) {
    const size = PLAYER_SIZE;

    super(name, 0, 0, size, size, gameWidth, gameHeight);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([0, 0]);
    this.accV = new Vector([0, 0]);

    this.size = size;

    this.preperingToJump = false;
    this.additionalJumpingSpeed = 0;
    this.maxAdditionalJumpingSpeed = 1;

    this.initSprite(size);
    this.initAnimations();
    this.initPlayer();
  }

  initPlayer() {
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

  initAnimations() {
    this.activeAnimation = null;

    //RIGHT

    this.idleAnimationRight = new Animation(
      this.spriteRight,
      PlayerSprites[PlayerStates.IDLE].start,
      PlayerSprites[PlayerStates.IDLE].end,
      true
    );

    this.runAnimationRight = new Animation(
      this.spriteRight,
      PlayerSprites[PlayerStates.RUN].start,
      PlayerSprites[PlayerStates.RUN].end,
      true
    );

    this.swordAnimationRight = new Animation(
      this.spriteRight,
      PlayerSprites[PlayerStates.SWORD].start,
      PlayerSprites[PlayerStates.SWORD].end,
      false,
      () => {
        this.setState(PlayerStates.IDLE);
      }
    );

    //LEFT

    this.idleAnimationLeft = new Animation(
      this.spriteLeft,
      PlayerSprites[PlayerStates.IDLE].start,
      PlayerSprites[PlayerStates.IDLE].end,
      true
    );

    this.runAnimationLeft = new Animation(
      this.spriteLeft,
      PlayerSprites[PlayerStates.RUN].start,
      PlayerSprites[PlayerStates.RUN].end,
      true
    );

    this.swordAnimationLeft = new Animation(
      this.spriteLeft,
      PlayerSprites[PlayerStates.SWORD].start,
      PlayerSprites[PlayerStates.SWORD].end,
      false,
      () => {
        this.setState(PlayerStates.IDLE);
      }
    );
  }

  setState(state) {
    if (this.state !== state) {
      this.state = state;

      switch (this.state) {
        case PlayerStates.IDLE:
          this.activeAnimation =
            this.direction === PlayerDirection.RIGHT
              ? this.idleAnimationRight
              : this.idleAnimationLeft;
          break;
        case PlayerStates.RUN:
          this.activeAnimation =
            this.direction === PlayerDirection.RIGHT
              ? this.runAnimationRight
              : this.runAnimationLeft;
          break;
        case PlayerStates.SWORD:
          this.activeAnimation =
            this.direction === PlayerDirection.RIGHT
              ? this.swordAnimationRight
              : this.swordAnimationLeft;
          break;
      }

      this.activeAnimation.start();
    }
  }

  update(deltaTime, timestamp) {
    this.activeAnimation.update(deltaTime, timestamp);

    if (this.preperingToJump) {
      this.additionalJumpingSpeed += 1;
    }

    if (this.additionalJumpingSpeed > this.maxAdditionalJumpingSpeed) {
      this.additionalJumpingSpeed = this.maxAdditionalJumpingSpeed;
    }

    this.calcPosition();
  }

  draw(canvas) {
    this.activeAnimation.draw(canvas, this.x, this.y);
  }

  drawRect() {
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(150, 20, 50, 150);
  }

  moveLeft() {
    this.direction = PlayerDirection.LEFT;
    this.setState(PlayerStates.RUN);
    this.speedV.vx = -6;
  }

  moveRight() {
    this.direction = PlayerDirection.RIGHT;
    this.setState(PlayerStates.RUN);
    this.speedV.vx = 6;
  }

  stop() {
    this.setState(PlayerStates.IDLE);
    this.speedV.vx = 0;
  }

  wantToJump() {
    if (this.accV.vy === 0) {
      this.preperingToJump = true;
    }
  }

  jump() {
    if (this.accV.vy === 0) {
      this.preperingToJump = false;
      this.speedV.vy = -this.size * 0.2; //- this.additionalJumpingSpeed;
      this.additionalJumpingSpeed = 0;
    }
  }

  useSword() {
    this.setState(PlayerStates.SWORD);
    //TODO:Zeev: continue from here. make this animation run only once
  }
}
