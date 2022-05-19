const Collision = {
  getObjectsCollidingWithActor: (actor, layer) => {
    return layer.objects.filter((l) => {
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
  }
};
