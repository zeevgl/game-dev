class Level {
  constructor(map, assetsFolder) {
    this.assetsFolder = assetsFolder;
    this.positions = [];
    this.map = map;
    this.sprite = null;
    this.platfroms = null;
    this.tilesPosition = [];
    this.tileSize = 70;
    this.initSprite();
    this.initPlatform();
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

    //draw platforms
    
    DEBUG_MODE && this.drawPlatforms(context);
  }

  drawPlatforms(context) {
    this.platfroms.objects.forEach((p) => {
      context.strokeRect(p.x, p.y, p.width, p.height);
    });
  }

  getTile(tiles, col, row) {
    //int oneDindex = (row * length_of_row) + column; // Indexes
    const index = row * this.map.width + col;
    return tiles[index];
  }

  initSprite() {
    const tileset = this.map.tilesets[0];
    const { positions, sprite } = getSpritePositions(
      tileset.tilewidth,
      tileset.tileheight,
      this.tileSize,
      tileset.columns,
      tileset.columns,
      `${this.assetsFolder}/${tileset.image}`
    );
    this.sprite = sprite;
    this.positions = positions;
  }

  initPlatform() {
    this.platfroms = this.map.layers[1];
  }
}
