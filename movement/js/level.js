class Level {
  constructor(map) {
    this.map = map;
    this.sprite = null;
    this.tileSize = 67;
    this.initSprite_70();
    ////int oneDindex = (row * length_of_row) + column; // Indexes
  }

  update(deltaTime, timestamp) {}

  draw(canvas) {
    this.sprite.draw(8, 380, 300);
    const ground = this.map.layers[0];

    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        const tile = this.getTile(ground.data, x, y);
        if (tile !== 0) {
          this.sprite.draw(tile - 1, x * this.tileSize, y * this.tileSize);
        }
      }
    }
  }

  getTile(tiles, col, row) {
    const index = row * this.map.width + col;
    return tiles[index];
  }

  initSprite_16() {
    const img = new Image();
    img.src = '../assets/maps/FreeCuteTileset/Tileset.png';

    const positions = [];
    const imgWidth = 16;
    const imgHeight = 16;
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 8; i++) {
        positions.push([i * imgWidth, j * imgHeight]);
      }
    }
    console.log('positions=', positions);

    this.sprite = new Sprite(
      img,
      imgWidth,
      imgHeight,
      positions,
      this.tileSize
    );
  }

  initSprite_70() {
    const img = new Image();
    img.src = '../assets/maps/tiles_spritesheet.png';

    const positions = [];
    const imgWidth = 70;
    const imgHeight = 70;
    for (let j = 0; j < 12; j++) {
      for (let i = 0; i < 12; i++) {
        positions.push([i * imgWidth, j * imgHeight]);
      }
    }

    this.sprite = new Sprite(
      img,
      imgWidth,
      imgHeight,
      positions,
      this.tileSize
    );
  }
}
