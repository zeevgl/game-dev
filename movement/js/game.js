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
      this.player.x + PLAYER_SIZE < 900
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
    this.drawDebug(context)
    this.player.draw(context);
    ctx.restore();
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }

  drawDebug(context) {
    context.fillRect(100, 0, 10, 10);

    context.fillRect(1050, 350, 10, 10);
    context.fillRect(1050 + 70, 350, 10, 10);
    context.fillRect(1050 + 70 , 350 + 210, 10, 10);
    context.fillRect(1050, 350 + 210, 10, 10);


    ///

    context.fillRect(0, 490, 10, 10);
    context.fillRect(0 + 420, 490, 10, 10);
    context.fillRect(0 + 420 , 490 + 70, 10, 10);
    context.fillRect(0, 490 + 70, 10, 10);

    // {
    //   "height":70,
    //   "id":3,
    //   "name":"first",
    //   "rotation":0,
    //   "type":"platform",
    //   "visible":true,
    //   "width":420,
    //   "x":0,
    //   "y":490
    //  },


    // {
    //   "height":70,
    //   "id":3,
    //   "name":"first",
    //   "rotation":0,
    //   "type":"platform",
    //   "visible":true,
    //   "width":420,
    //   "x":0,
    //   "y":560
    //  }, 
  }

  calcColision() {
    //this.player.y = 350;
    // this.player.accV.vy = 0;

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
        // this.player.boxY > p.y &&
        // this.player.boxY <= p.y + p.height &&
        this.player.boxX >= p.x &&
        this.player.boxX < p.x + p.width
      ) {
        console.log('wall');
        console.log('p.x=', p.x);
        console.log('player = ', this.player.x, this.player.boxX);
        return true;
      }

      return false;
    });

    if (resWall) {
      this.player.x = 1050;
      this.player.stop();
    }
  }
}
