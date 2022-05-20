class Player extends Actor {
  constructor(name, gameWidth, gameHeight) {
    const size = PLAYER_SIZE;

    super(name, 0, 0, size, size, gameWidth, gameHeight, 100, 10);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([0, 0]);
    this.accV = new Vector([0, 0]);

    this.size = size;

    this.flickering = {
      active: false,
      maxDuration: 2000,
      totalDt: 0,
      count: 0,
    };

    this.resetFlickring();
    this.initSprite(size);
    this.initAnimations();
    this.initPlayer();
    this.initCollisionBoxes();
  }

  initPlayer() {
    this.direction = PlayerDirection.RIGHT;
    this.setState(PlayerStates.IDLE);
  }

  initSprite(size) {
    const { positions, sprite } = getSpritePositions(
      50,
      37,
      size,
      7,
      11,
      '../assets/Adventurer/adventurer-Sheet.png'
    );

    const left = getSpritePositions(
      50,
      37,
      size,
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

  initCollisionBoxes() {
    this.bodyBox = new CollisionBox(
      this.x,
      this.y,
      this.size,
      this.size,
      20,
      0,
      'rgba(0,0,255,0.5)'
    );

    this.damageBox = new CollisionBox(
      this.x,
      this.y,
      this.size,
      this.size,
      60,
      10,
      'rgba(0,255,0,0.5)'
    );

    this.attackBox = new CollisionBox(
      this.x,
      this.y,
      this.size,
      this.size,
      10,
      0,
      'rgba(255,0,0,0.5)'
    );

    this.collisonBoxes = [this.damageBox, this.attackBox, this.bodyBox];
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

    this.updateFlickering(deltaTime);

    this.calcPosition();
    this.collisonBoxes.forEach((box) => {
      box.update(this.x, this.y, deltaTime, timestamp);
    });
  }

  updateFlickering(deltaTime) {
    if (this.flickering.active) {
      this.flickering.totalDt += deltaTime;
      if (this.flickering.totalDt >= this.flickering.maxDuration) {
        this.resetFlickring();
      } else {
        this.flickering.count++;
      }
    }
  }

  draw(canvas) {
    if (this.flickering.active && this.flickering.count % 5 === 0) {
      return;
    }

    this.activeAnimation.draw(canvas, this.x, this.y);

    if (DEBUG_MODE) {
      this.collisonBoxes.forEach((box) => {
        box.draw(canvas);
      });
    }
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

  jump() {
    if (this.accV.vy === 0) {
      this.speedV.vy = -this.size * 0.2;
    }
  }

  useSword() {
    this.setState(PlayerStates.SWORD);
  }

  takeDamage(damage) {
    if (!this.flickering.active) {
      this.heath -= damage;
      this.flickering.active = true;
    }
  }

  resetFlickring() {
    this.flickering.active = false;
    this.flickering.totalDt = 0;
    this.flickering.count = 0;
  }
}
