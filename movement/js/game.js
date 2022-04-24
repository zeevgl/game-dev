class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player('hero', gameWidth, gameHeight);
    this.input = new InputHandler(this.player, this);
  }

  update(deltaTime, timestamp) {
    this.player.update(deltaTime, timestamp);
  }

  draw(context) {
    console.log('this.player.x=', this.player.x + PLAYER_SIZE);
    ctx.save();
    if (
      this.player.x + PLAYER_SIZE > this.gameWidth / 2 &&
      this.player.x + PLAYER_SIZE < 900
    ) {
      //follow
      context.translate(-this.player.x - PLAYER_SIZE + canvas.width / 2, 0);
    } else if ( this.player.x + PLAYER_SIZE >= 900) {
      //getting to right eadge. WIP
      context.translate(-this.player.x - PLAYER_SIZE + this.player.x * 0.1 + canvas.width / 2, 0);
    }

    //  else {
    //   //dont follow
    // }
    this.drawRect(context);
    this.player.draw(context);
    ctx.restore();
  }

  drawRect(context) {
    for (let i = 0; i < 30; i++) {
      context.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }
}
