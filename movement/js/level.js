class Level {
  constructor(map, assetsFolder) {
    this.assetsFolder = assetsFolder;
    this.positions = [];
    this.map = map;
    this.sprite = null;
    this.tileSize = 67;
    this.initSprite();
  }

  update(deltaTime, timestamp) {}

  draw(context) {
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
    //int oneDindex = (row * length_of_row) + column; // Indexes
    const index = row * this.map.width + col;
    return tiles[index];
  }

  initSprite() {
    const tileset = this.map.tilesets[0];

    const imgWidth = tileset.tilewidth;
    const imgHeight = tileset.tileheight;

    for (let j = 0; j < tileset.columns; j++) {
      for (let i = 0; i < tileset.columns; i++) {
        this.positions.push([i * imgWidth, j * imgHeight]);
      }
    }

    const img = new Image();
    img.src = `${this.assetsFolder}/${tileset.image}`;

    this.sprite = new Sprite(
      img,
      imgWidth,
      imgHeight,
      this.positions,
      this.tileSize
    );
  }
}
