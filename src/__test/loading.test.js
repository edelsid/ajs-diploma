import GameStateService from '../js/GameStateService';

const storage = '{"turn":true, "maxLevel":4}';

jest.mock('../js/GameStateService', () => ({
  ...jest.requireActual('../js/GameStateService'),
  load: jest.fn(() => JSON.parse(storage)),
}));

test('successful loading', () => {
  const result = GameStateService.load('{"turn":true, "maxLevel":4}');
  expect(result).toEqual({ turn: true, maxLevel: 4 });
});

test('unsuccessful loading', () => {
  GameStateService.load = () => {
    throw new Error('Invalid state');
  };

  expect(() => { GameStateService.load({ turn: true, maxLevel: 4 }); }).toThrow();
});

afterEach(() => {
  jest.clearAllMocks();
});
