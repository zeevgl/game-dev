const Collision = {
  getObjectsCollidingWithActor: (actor, layer) => {
    return layer.objects.filter((object) => {
      if (
        actor.x < object.x + object.width &&
        actor.boxX > object.x &&
        actor.y < object.y + object.height &&
        actor.boxY > object.y
      ) {
        return true;
      }

      return false;
    });
  },
  getObjectsCollidingWithBox: (collisionBox, layer) => {
    return layer.objects.filter((object) => {
      if (
        collisionBox.x1 < object.x + object.width &&
        collisionBox.x2 > object.x &&
        collisionBox.y1 < object.y + object.height &&
        collisionBox.y2 > object.y
      ) {
        return true;
      }

      return false;
    });
  },
};
