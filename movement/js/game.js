class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.state = GameStates.RUNNING;
    this.level4 = new Level(TileMaps.map4, '../assets/maps');
    this.player = new Player('hero', gameWidth, gameHeight);
    this.enemy = new Enemy('enemy', gameWidth, gameHeight, 100, 0);
    this.input = new InputHandler(this.player, this);
    this.currentLevel = this.level4;
    this.initNpcs();
  }

  update(deltaTime, timestamp) {
    if (this.state !== GameStates.RUNNING) {
      return;
    }

    this.player.update(deltaTime, timestamp);
    this.checkColisionWithPlatform(this.player);

    this.npcs.forEach((npc) => {
      if (this.isNPCInScreen(npc)) {
        npc.update(deltaTime, timestamp);
        this.checkColisionWithPlatform(npc);

        if (this.checkColisionWithPlayer(npc)) {
          this.player.takeDamage(npc.attackDamage);
        }

        this.npcAI(npc);
      }
    });

    if (this.player.heath <= 0) {
      this.state = GameStates.GAMEOVER;
    }
  }

  draw(context) {
    context.save();

    if (this.state === GameStates.GAMEOVER) {
      this.drawGameOver(context);
      return;
    }

    this.centerCameraOnPlayer(context);

    this.currentLevel.draw(context);
    this.player.draw();

    this.npcs.forEach((npc) => {
      if (this.isNPCInScreen(npc)) {
        npc.draw(context);
      }
    });

    this.drawDebug(context);
    context.restore();

    this.drawHUD(context);
  }

  drawGameOver(context) {
    context.fillStyle = '#ffffff';
    context.globalAlpha = 0.9;
    context.fillRect(0, 0, this.gameWidth, this.gameHeight);
    context.globalAlpha = 1.0;

    context.fillStyle = '#000000';
    context.font = '48px serif';
    const text = 'GAME OVER';
    const textWidth = context.measureText(text).width;

    context.fillText(
      text,
      this.gameWidth / 2 - textWidth / 2,
      this.gameHeight / 2
    );
  }

  drawHUD(context) {
    context.fillStyle = '#000000';
    context.font = '24px serif';
    const text = `Health ${this.player.heath}%`;
    const textWidth = context.measureText(text).width;
    context.textAlign = 'start';
    context.textBaseline = 'top';
    context.fillText(text, this.gameWidth - textWidth - 10, 10);
  }

  centerCameraOnPlayer(context) {
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
  }

  drawRect(context) {
    for (let i = 0; i < 300; i++) {
      context.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
      context.fillRect(50 * i + i * 50, 20, 10, 800);
    }
  }

  drawDebug(context) {}

  checkColisionWithPlatform(npc) {
    const objects = this.currentLevel.platfroms.objects.filter((p, i) => {
      if (
        npc.x < p.x + p.width &&
        npc.boxX > p.x &&
        npc.y < p.y + p.height &&
        npc.boxY > p.y
      ) {
        return true;
      }

      return false;
    });

    objects.forEach((res, i, arr) => {
      const isAbove = npc.boxY < res.y + res.height;
      const isBellow = npc.boxY > res.y + res.height;
      const isOnLeft = npc.boxX < res.x + res.width;
      const isOnRight = npc.boxX > res.x + res.width;

      if (isAbove) {
        npc.y = res.y - npc.height;
        npc.accV.vy = 0;
        npc.speedV.vy = 0;
      } else if (isBellow) {
        npc.y = res.y + res.height;
        npc.speedV.vy = -npc.speedV.vy;
        npc.accV.vy = -npc.accV.vy;
      } else if (isOnLeft) {
        npc.x = res.x - npc.width;
      } else if (isOnRight) {
        npc.x = res.x + res.width;
      }
    });
  }

  checkColisionWithPlayer(npc) {
    if (
      npc.x < this.player.x + this.player.width &&
      npc.boxX > this.player.x &&
      npc.y < this.player.y + this.player.height &&
      npc.boxY > this.player.y
    ) {
      return true;
    }

    return false;
  }

  initNpcs() {
    const npcs = this.currentLevel.map.layers.find(
      (layer) => layer.name === 'npcs'
    );
    this.npcs = npcs.objects.map((obj) => {
      return new Enemy(obj.name, this.gameWidth, this.gameHeight, obj.x, obj.y);
    });
  }

  npcAI(npc) {
    npc.speedV.vx = this.player.x > npc.x ? 1 : -1;
  }

  isNPCInScreen(npc) {
    return Math.abs(this.player.boxX - npc.x) < this.gameWidth;
  }
}
