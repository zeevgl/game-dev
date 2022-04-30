const PlayerStates = {
  IDLE: 'IDLE',
  RUN: 'RUN',
  JUMP: 'JUMP',
  CROUCH: 'CROUCH',
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
};
