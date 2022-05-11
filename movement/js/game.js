class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level4 = new Level(TileMaps.map4, '../assets/maps');
    this.level5 = new Level(TileMaps.map5, '../assets/maps');
    this.player = new Player('hero', gameWidth, gameHeight);
    this.enemy = new Enemy('enemy', gameWidth, gameHeight, 100, 0);
    this.input = new InputHandler(this.player, this);
    this.currentLevel = this.level4;

    this.npcs = [this.enemy];
  }

  update(deltaTime, timestamp) {
    this.player.update(deltaTime, timestamp);
    this.checkColisionWithPlatform(this.player);

    this.npcs.forEach((actor) => {
      actor.update(deltaTime, timestamp);
      this.checkColisionWithPlatform(actor);
    });
  }

  draw(context) {
    context.save();
    if (
      this.player.x + PLAYER_SIZE > this.gameWidth / 2 &&
      this.player.x + PLAYER_SIZE < 190000
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
    this.player.draw();
    this.npcs.forEach((actor) => {
      actor.draw(context);
    });
    context.restore();
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }

  drawDebug(context) {}

  checkColisionWithPlatform(actor) {
    const objects = this.currentLevel.platfroms.objects.filter((p, i) => {
      if (
        actor.x < p.x + p.width &&
        actor.boxX > p.x &&
        actor.y < p.y + p.height &&
        actor.boxY > p.y
      ) {
        return true;
      }

      return false;
    });

    objects.forEach((res, i, arr) => {
      const isAbove = actor.boxY < res.y + res.height;
      const isBellow = actor.boxY > res.y + res.height;
      const isOnLeft = actor.boxX < res.x + res.width;
      const isOnRight = actor.boxX > res.x + res.width;

      if (isAbove) {
        actor.y = res.y - actor.height;
        actor.accV.vy = 0;
        actor.speedV.vy = 0;
      } else if (isBellow) {
        actor.y = res.y + res.height;
        actor.speedV.vy = -actor.speedV.vy;
        actor.accV.vy = -actor.accV.vy;
      } else if (isOnLeft) {
        actor.x = res.x - actor.width;
      } else if (isOnRight) {
        actor.x = res.x + res.width;
      }
    });
  }
}
