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

  draw(ctx) {
    this.drawRect();
    ctx.save();

    // ctx.translate(
    //   this.player.x - this.gameWidth / 2,
    //   0
    // );

    // ...your drawing code...

    this.player.draw(ctx);

    ctx.restore();
  }

  drawRect() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(10, 20, 50, 150);
  }
}
