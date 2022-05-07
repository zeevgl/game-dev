const PlayerStates = {
  IDLE: 'IDLE',
  RUN: 'RUN',
  JUMP: 'JUMP',
  CROUCH: 'CROUCH',
  SWORD: 'SWORD',
};

const SpriteStates = {
  [PlayerStates.IDLE]: {
    start: 0,
    end: 4,
  },
  [PlayerStates.RUN]: {
    start: 8,
    end: 14,
  },
  [PlayerStates.SWORD]: {
    start: 43,
    end: 45,
  },
};

const PlayerDirection = {
  RIGHT : 1,
  LEFT: 0,
}
