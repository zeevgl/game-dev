
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
  