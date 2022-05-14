let canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 630;
const PLAYER_SIZE = 150;
const GRAVITY = PLAYER_SIZE * 0.001; //0.1;
const DEBUG_MODE = false;

const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;
function gameLoop(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    //console.log('timestamp = ', timestamp, deltaTime);

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime, timestamp);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);