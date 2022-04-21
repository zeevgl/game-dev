const img = new Image();
img.src = './assets/adventurer-Sheet.png';

class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.imageFrame = 0;
        this.tick = 0;
    }

    update(deltaTime, timestamp) {
        this.tick ++;
        if (this.tick % 10 == 0) {
            this.imageFrame ++;
            if (this.imageFrame >= 3) {
                this.imageFrame = 0;
            }
            this.tick= 0;
        }

    }

    draw(ctx) {
        this.drawRect();
        this.drawSprite();
    }

    drawRect() {
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(10, 20, 50, 150);
    }

    drawText() {
        // ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        // ctx.fillStyle = "rgba(0,0,0,0.5)";
        // ctx.fill();
        //
        // ctx.font = "30px Arial";
        // ctx.fillStyle = "white";
        // ctx.textAlign = "center";
        // ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    drawSprite() {



        const sprite = new Sprite(img, 50, 37, [
            // specify a few sprite locations
            [0, 0],  // green
            [50, 0],  // green
            [50, 37],  // green
        ], 500);

        sprite.draw(this.imageFrame, 0, 0);
        // sprite.draw(1, 0, 60);
        // sprite.draw(2, 0, 120);
    }
}



function Sprite(img, width, height, positions, sizeW, sizeH){
    //https://davetayls.me/blog/2013/02/11/drawing-sprites-with-canvas
    this.img = img;
    this.width = width;
    this.height = height;
    this.positions = positions;
    this.sizeW = sizeW;
    this.sizeH = sizeH || sizeW;
}
Sprite.prototype = {
    draw: function(position, x, y){
        var pos = this.positions[position];
        // ctx.fillStyle = "#ff0000";
        // ctx.fillRect(pos[0], pos[1], 50, 150);
        ctx.drawImage(
            this.img,
            pos[0],
            pos[1],
            this.width,
            this.height,
            x, y,
            this.sizeW,
            this.sizeH
        );
    }
};