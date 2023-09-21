import GamePlay from '../js/GamePlay';

const player1 = {
  attack: 10,
  defence: 40,
  health: 50,
  level: 1,
  type: 'magician',
};

jest.mock('../js/GamePlay', () => ({
  ...jest.requireActual('../js/GamePlay'),
  tooltipFormation: jest.fn(() => `\u{1F396}${player1.level} \u{2694}${player1.attack} \u{1F6E1}${player1.defence} \u{2764}${player1.health}`),
}));

test('message generation', () => {
  const positionedPlayers = [
    {
      character: player1,
      position: 1,
    },
  ];
  const message = GamePlay.tooltipFormation(positionedPlayers[0].position);
  expect(message).toEqual('\u{1F396}1 \u{2694}10 \u{1F6E1}40 \u{2764}50');
});

afterEach(() => {
  jest.clearAllMocks();
});
