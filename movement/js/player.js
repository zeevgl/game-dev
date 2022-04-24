class Player extends Actor {
  constructor(name, gameWidth, gameHeight) {
    const size = PLAYER_SIZE;

    //super(name, gameWidth/2 - size, 0, size, size, gameWidth, gameHeight);
    super(name, 0, 0, size, size, gameWidth, gameHeight);
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.speedV = new Vector([2, 30]);
    this.accV = new Vector([0, 0]);

    this.size = size;

    this.initPlayer();
    this.initSprite(size);
    this.initPlayerStates();
  }

  initPlayer() {
    this.y = this.gameHeight - this.size;
  }

  initSprite(size) {
    const img = new Image();
    img.src = '../assets/Adventurer/adventurer-Sheet.png';

    const positions = [];
    const imgWidth = 50;
    const imgHeight = 37;
    for (let j = 0; j < 11; j++) {
      for (let i = 0; i < 7; i++) {
        positions.push([i * imgWidth, j * imgHeight]);
      }
    }

    this.sprite = new Sprite(img, imgWidth, imgHeight, positions, size);
  }

  initPlayerStates() {
    this.playerStates = {
      IDLE: 'IDLE',
      RUN: 'RUN',
      JUMP: 'JUMP',
      CROUCH: 'CROUCH',
    };

    this.spriteStates = {
      [this.playerStates.IDLE]: {
        start: 0,
        end: 4,
      },
      [this.playerStates.RUN]: {
        start: 8,
        end: 14,
      },
    };

    this.setState(this.playerStates.IDLE);
  }

  setState(state) {
    if (this.state !== state) {
      this.state = state;
      this.imageFrame = this.spriteStates[this.state].start;
      this.tick = 0;
    }
  }

  update(deltaTime, timestamp) {
    this.tick++;
    if (this.tick % 10 == 0) {
      this.imageFrame++;
      if (this.imageFrame >= this.spriteStates[this.state].end) {
        this.imageFrame = this.spriteStates[this.state].start;
      }
      this.tick = 0;
    }

    this.calcPosition();
  }

  draw(canvas) {
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
    this.setState(this.playerStates.RUN);
    this.accV.vx = -3;
  }

  moveRight() {
    this.setState(this.playerStates.RUN);
    this.accV.vx = 3;
  }

  stop() {
    this.setState(this.playerStates.IDLE);
    this.accV.vx = 0;
  }

  jump() {
    if (this.accV.vy === 0) {
      this.accV.vy = -this.size * 0.013; //-1.5;
    }
  }
}
