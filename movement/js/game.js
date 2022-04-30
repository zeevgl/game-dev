class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level4 = new Level(TileMaps.map4, '../assets/maps');
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

    this.level4.draw(context);
    this.player.draw(context);
    ctx.restore();
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }
}
