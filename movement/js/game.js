class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level4 = new Level(TileMaps.map4, '../assets/maps');
    this.player = new Player('hero', gameWidth, gameHeight);
    this.input = new InputHandler(this.player, this);
    this.currentLevel = this.level4;
  }

  update(deltaTime, timestamp) {
    this.player.update(deltaTime, timestamp);
    this.calcColision();
  }

  draw(context) {
    //console.log('this.player.x=', this.player.x + PLAYER_SIZE);
    ctx.save();
    if (
      this.player.x + PLAYER_SIZE > this.gameWidth / 2 &&
      this.player.x + PLAYER_SIZE < 1900
    ) {
      //follow
      context.translate(-this.player.x - PLAYER_SIZE + canvas.width / 2, 0);
    } else if (this.player.x + PLAYER_SIZE >= 900) {
      //getting to right edge. WIP
      context.translate(
        -this.player.x - PLAYER_SIZE + this.player.x * 0.2 + canvas.width / 2,
        0
      );
    }

    this.currentLevel.draw(context);
    this.drawDebug(context);
    this.player.draw(context);
    ctx.restore();
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }

  drawDebug(context) {}

  calcColision() {
    //check what player touches
    const objects = this.currentLevel.platfroms.objects.filter((p, i) => {
      //check colision. todo extruct maybe.....

      if (
        this.player.x < p.x + p.width &&
        this.player.boxX > p.x &&
        this.player.y < p.y + p.height &&
        this.player.boxY > p.y
      ) {
        return true;
      }

      return false;
    });

    objects.forEach((res) => {
      const isAbove = this.player.boxY < res.y + res.height;
      const isBellow = this.player.boxY > res.y + res.height;
      const isOnLeft = this.player.boxX < res.x + res.width;
      const isOnRight = this.player.boxX > res.x + res.width;

      if (isAbove) {
        this.player.y = res.y - this.player.height;
        this.player.accV.vy = 0;
      } else if (isBellow) {
        this.player.y = res.y + res.height;
        this.player.accV.vy = -this.player.accV.vy;
      } else if (isOnLeft) {
        this.player.x = res.x - this.player.width;
      } else if (isOnRight) {
        this.player.x = res.x + res.width;
      }
    });
  }

  calcColisionX() {
    console.log('this.player boxX=', this.player.boxX);

    //check if platform

    const res = this.currentLevel.platfroms.objects.find((p, i) => {
      if (
        p.type === 'platform' &&
        this.player.boxY > p.y &&
        this.player.boxY <= p.y + p.height &&
        this.player.centerX > p.x - this.player.size * 0.3 &&
        this.player.centerX < p.x + p.width + this.player.size * 0.05
      ) {
        return true;
      }

      return false;
    });

    if (res) {
      this.player.y = res.y - this.player.size;
      this.player.accV.vy = 0;
    }

    //cehck if wall

    const resWall = this.currentLevel.platfroms.objects.find((p, i) => {
      if (
        p.type === 'wall' &&
        this.player.boxY > p.y &&
        this.player.boxY <= p.y + p.height &&
        this.player.boxX > p.x &&
        this.player.centerX < p.x + p.width
      ) {
        console.log('wall');
        // console.log('p.x=', p.x);
        // console.log('player = ', this.player.x, this.player.boxX);
        return true;
      }

      return false;
    });

    if (resWall) {
      //this.player.stop();
      this.player.x = resWall.x - this.player.size;
    }
  }
}
