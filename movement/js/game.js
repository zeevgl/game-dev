class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.state = GameStates.RUNNING;
    this.level4 = new Level(TileMaps.map4, '../assets/maps');
    this.level6 = new Level(TileMaps.map6, '../assets/maps');
    this.player = new Player('hero', gameWidth, gameHeight);
    this.enemy = new Enemy('enemy', gameWidth, gameHeight, 100, 0);
    this.input = new InputHandler(this.player, this);
    this.currentLevel = this.level6;
    this.initNpcs();
  }

  update(deltaTime, timestamp) {
    if (this.state !== GameStates.RUNNING) {
      return;
    }

    this.player.update(deltaTime, timestamp);
    this.checkColisionWithPlatform(this.player);
    this.checkColisionInteractable(this.player);

    this.npcs.forEach((npc) => {
      if (npc.isAlive && this.isNPCInScreen(npc)) {
        npc.update(deltaTime, timestamp);
        this.checkColisionWithPlatform(npc);

        if (npc.attackBox.checkCollision(this.player.damageBox)) {
          this.player.takeDamage(npc.attackDamage);
        } else if (
          this.player.state === PlayerStates.SWORD &&
          this.player.attackBox.checkCollision(npc.damageBox)
        ) {
          npc.takeDamage(this.player.attackDamage);
        }

        this.npcAI(npc);
      }
    });

    if (this.player.heath <= 0 || this.player.y > this.gameHeight) {
      this.state = GameStates.GAMEOVER;
    }

    //this.removeDeadNpcs();  //not sure if its needed. waist of run time and mem
  }

  draw(context) {
    context.save();

    if (this.state === GameStates.GAMEOVER) {
      this.drawGameOver(context);
      return;
    } else if (this.state === GameStates.WIN) {
      this.drawWin(context);
      return;
    }

    this.drawBackground(context);

    this.centerCameraOnPlayer(context);

    this.currentLevel.draw(context);
    this.player.draw(context);

    this.npcs.forEach((npc) => {
      if (npc.isAlive && this.isNPCInScreen(npc)) {
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

  drawWin(context) {
    context.fillStyle = '#ffffff';
    context.globalAlpha = 0.9;
    context.fillRect(0, 0, this.gameWidth, this.gameHeight);
    context.globalAlpha = 1.0;

    context.fillStyle = '#ff0000';
    context.font = '48px serif';
    const text = 'LEVEL COMPLETE';
    const textWidth = context.measureText(text).width;

    context.fillText(
      text,
      this.gameWidth / 2 - textWidth / 2,
      this.gameHeight / 2
    );
  }

  drawHUD(context) {
    context.fillStyle = '#ffffff';
    context.font = '24px arial';
    const text = `Health ${this.player.heath}%`;
    const textWidth = context.measureText(text).width;
    context.textAlign = 'start';
    context.textBaseline = 'top';
    context.fillText(text, this.gameWidth - textWidth - 10, 10);
  }

  drawBackground(context) {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, this.gameWidth, this.gameHeight);
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

  checkColisionWithPlatform(actor) {
    const objects = Collision.getObjectsCollidingWithActor(
      actor,
      this.currentLevel.platfroms
    );

    objects.forEach((res) => {
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

  checkColisionInteractable(npc) {
    const objects = Collision.getObjectsCollidingWithActor(
      npc,
      this.currentLevel.interactable
    );

    objects.forEach((res) => {
      if (res.name === 'endOfLevel') {
        this.state = GameStates.WIN;
      }
    });
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

  removeDeadNpcs() {
    this.npcs = this.npcs.filter((npc) => npc.isAlive);
  }
}
