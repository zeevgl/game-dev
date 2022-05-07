class InputHandler {
  constructor(player, game) {
    document.addEventListener(
      'keydown',
      (event) => {
        console.log('key', event.code);
        switch (event.code) {
          case 'ArrowLeft':
            player.moveLeft();
            break;

          case 'ArrowRight':
            player.moveRight();
            break;

          case 'Space':
            player.wantToJump();
            break;

          case 'ControlLeft':
            player.useSword();
            break;

          // case 27:
          //   game.togglePause();
          //   break;

          // case 32:
          //   game.start();
          //   break;
        }
      },
      false
    );

    document.addEventListener(
      'keyup',
      (event) => {
        switch (event.code) {
          case 'ArrowRight':
          case 'ArrowLeft':
            player.stop();
            break;
          case 'Space':
            player.jump();
            break;
        }
      },
      false
    );
  }
}
