class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.size = 150;

    this.img = new Image();
    this.img.src = '../assets/Adventurer/adventurer-Sheet.png';
    this.imageFrame = 0;
    this.tick = 0;
    this.initPlayer();
  }

  initPlayer() {
    this.y = this.gameHeight - this.size;
  }

  update(deltaTime, timestamp) {
    this.tick++;
    if (this.tick % 10 == 0) {
      this.imageFrame++;
      if (this.imageFrame >= 3) {
        this.imageFrame = 0;
      }
      this.tick = 0;
    }
  }

  draw(ctx) {
    this.drawRect();
    this.drawSprite();
  }

  drawRect() {
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(150, 20, 50, 150);
  }

  drawSprite() {
    const sprite = new Sprite(
      this.img,
      50,
      37,
      [
        // specify a few sprite locations
        [0, 0], // idel
        [50, 0], // green
        [50, 37], // green
      ],
      this.size
    );

    sprite.draw(this.imageFrame, this.x, this.y);
  }
}

function Sprite(img, width, height, positions, sizeW, sizeH) {
  //https://davetayls.me/blog/2013/02/11/drawing-sprites-with-canvas
  this.img = img;
  this.width = width;
  this.height = height;
  this.positions = positions;
  this.sizeW = sizeW;
  this.sizeH = sizeH || sizeW;
}
Sprite.prototype = {
  draw: function (position, x, y) {
    var pos = this.positions[position];
    ctx.drawImage(
      this.img,
      pos[0],
      pos[1],
      this.width,
      this.height,
      x,
      y,
      this.sizeW,
      this.sizeH
    );
  },
};
