class Level {
  constructor(map) {
    this.map = map;
    this.sprite = null;
    this.tileSize = 70;
    this.initSprite_70();
    this.counter = 0;
  }

  update(deltaTime, timestamp) {}

  draw(canvas) {
    // if (this.counter > 1) {
    //   return;
    // }

    //this.counter++;
    this.sprite.draw(2, 380, 300);
    const ground = this.map.layers[0];
    //console.log('ground=', ground);
    //debugger;
    //console.log('ground.data.lenght=', ground.data.length);
    // for (let i = 0; i < ground.data.length; i++) {
    //   if (ground.data[i] !== 0) {
    //     console.log('i=', ground.data[i], i);
    //     this.sprite.draw(ground.data[i], i*10, i*10);
    //   }
    //   //this.sprite.draw(ground.data[i], 100, 100);

    //   //console.log('ground.data[i]=', ground.data[i]);
    // }
    //debugger;
    // for (let x = 0; x < GAME_WIDTH / this.tileSize; x++) {
    //   for (let y = 0; y < GAME_HEIGHT / this.tileSize; y++) {
    //     console.log('x,y=', x,y);
    //     const index = y * (GAME_WIDTH/this.tileSize) + x;
    //     const tile=  ground.data[ Math.round(index)];
    //     console.log('index, tile=', index, tile);
    //     debugger;
    //     if (tile!==0) {
    //         console.log('index=', index, ground.data[ Math.round(index)]);
    //         debugger;

    //     }
    //     //ground.data[]
    //     //const index = tx + x + (ty + y) * c;

    //     //int oneDindex = (row * length_of_row) + column; // Indexes

    //     //const index = y * (GAME_HEIGHT/16) + x;
    //     //ground.data[M]
    //     //this.sprite.draw(10, 380, 76);
    //     //console.log('index=', index);
    //   }
    // }
    //console.log('DONE');
    // //10 6367

    // for (let i = 0; i < ground.data.length; i++) {
    //   if (ground.data[i] !== 0) {
    //     //console.log('i=', ground.data[i], i);
    //     //this.sprite.draw(ground.data[i], i*10, i*10);
    //   }
    // }

    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        // console.log('x,y=', x, y);
        const index = y * this.map.width + x;
        if (ground.data[index] !== 0) {
          this.sprite.draw(
            ground.data[index],
            x * this.tileSize,
            y * this.tileSize
          );
        }

        //console.log('index=', index);
        // const tile = ground.data[Math.round(index)];
        // console.log('index, tile=', index, tile);
        // debugger;
        // if (tile !== 0) {
        //   console.log('index=', index, ground.data[Math.round(index)]);
        //   debugger;
        // }
        //ground.data[]
        //const index = tx + x + (ty + y) * c;

        //int oneDindex = (row * length_of_row) + column; // Indexes

        //const index = y * (GAME_HEIGHT/16) + x;
        //ground.data[M]
        //this.sprite.draw(10, 380, 76);
        //console.log('index=', index);
      }
    }
  }

  //const ground = TileMaps.map1.layers[0];
  // //console.log('<ground.data.length=', ground.data.length);
  // const img = new Image();
  // img.src = '../assets/Adventurer/adventurer-Sheet.png';
  // const sprite = new Sprite(img, 16, 16, [[0, 0]], 160);
  // sprite.draw(0, 100, 100);
  // for (let i = 0; i < ground.data.length; i++) {}

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
    console.log('positions=', positions);

    this.sprite = new Sprite(
      img,
      imgWidth,
      imgHeight,
      positions,
      this.tileSize
    );
  }
}
