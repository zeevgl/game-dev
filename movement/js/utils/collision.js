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
