const img = new Image();
img.src = '../assets/Adventurer/adventurer-Sheet.png';

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(gameWidth, gameHeight);
    this.input = new InputHandler(this.player, this);
  }

  update(deltaTime, timestamp) {
    this.player.update(deltaTime, timestamp);
  }

  draw(ctx) {
    this.drawRect();
    this.player.draw();
  }

  drawRect() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(10, 20, 50, 150);
  }
}
