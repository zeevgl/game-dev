const Collision = {
  getObjectsCollidingWithActor: (actor, layer) => {
    return layer.objects.filter((l, i) => {
      if (
        actor.x < l.x + l.width &&
        actor.boxX > l.x &&
        actor.y < l.y + l.height &&
        actor.boxY > l.y
      ) {
        return true;
      }

      return false;
    });
  },
  checkColisionOf2Actors: (actor1, actor2) => {
    if (
      actor1.collisionX1 < actor2.collisionX2 &&
      actor1.collisionX2 > actor2.collisionX1 &&
      actor1.collisionY1 < actor2.collisionY2 &&
      actor1.collisionY2 > actor2.collisionY1
    ) {
      return true;
    }

    return false;
  },
};
