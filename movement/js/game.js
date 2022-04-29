class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level = new Level();
    this.player = new Player('hero', gameWidth, gameHeight);
    this.input = new InputHandler(this.player, this);
  }

  update(deltaTime, timestamp) {
    this.player.update(deltaTime, timestamp);
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

    //  else {
    //   //dont follow
    // }
    //this.drawRect(context);
    //this.level.draw1(context);
    this.level.draw(context);
    this.player.draw(context);
    ctx.restore();
  }

  drawMap(context) {
    // const ground = TileMaps.map1.layers[0];
    // //console.log('<ground.data.length=', ground.data.length);
    // const img = new Image();
    // img.src = '../assets/Adventurer/adventurer-Sheet.png';
    // const sprite = new Sprite(img, 16, 16, [[0, 0]], 160);
    // sprite.draw(0, 100, 100);
    // for (let i = 0; i < ground.data.length; i++) {}
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }
}
