const Collision = {
  getObjectsCollidingWithBox: (collisionBox, layer) => {
    return layer.objects.filter((object) => {
      return (
        collisionBox.x1 < object.x + object.width &&
        collisionBox.x2 > object.x &&
        collisionBox.y1 < object.y + object.height &&
        collisionBox.y2 > object.y
      );
    });
  },
};

//TODO:Zeev: refactor this code to match this project
function collideMap(collisionBox, object) {
  const r1 = {
    x: collisionBox.x1,
    y: collisionBox.y1,
    w: collisionBox.x2 - collisionBox.x1,
    h: collisionBox.y2 - collisionBox.y1,
  };

  const r2 = {
    x: object.x,
    y: object.y,
    w: object.width,
    h: object.height,
  };

  return collide(r1, r2);
}

function collide(r1, r2) {
  var dx = r1.x + r1.w / 2 - (r2.x + r2.w / 2);
  var dy = r1.y + r1.h / 2 - (r2.y + r2.h / 2);
  var width = (r1.w + r2.w) / 2;
  var height = (r1.h + r2.h) / 2;
  var crossWidth = width * dy;
  var crossHeight = height * dx;
  var collision = 'none';
  //
  if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
    if (crossWidth > crossHeight) {
      collision = crossWidth > -crossHeight ? 'bottom' : 'left';
    } else {
      collision = crossWidth > -crossHeight ? 'right' : 'top';
    }
  }
  return collision;
}
