class CollisionBox {
  constructor(x, y, width, height, collisionWidth, collisionHeight, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.collisionWidth = collisionWidth ? collisionWidth : 0;
    this.collisionHeight = collisionHeight ? collisionHeight : 0;
    this.color = color ? color : 'rgba(255,0,0,0.5)';
  }

  get x1() {
    return this.x + this.collisionWidth;
  }

  get x2() {
    return this.x + this.width - this.collisionWidth;
  }

  get y1() {
    return this.y + this.collisionHeight;
  }

  get y2() {
    return this.y + this.height - this.collisionHeight;
  }

  update(x, y, dt, timestamp) {
    this.x = x;
    this.y = y;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
  }

  checkCollision(collisionBox) {
    return (
      this.x1 < collisionBox.x2 &&
      this.x2 > collisionBox.x1 &&
      this.y1 < collisionBox.y2 &&
      this.y2 > collisionBox.y1
    );
  }
}
