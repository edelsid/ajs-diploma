import GamePlay from '../js/GamePlay';
import Bowman from '../js/characters/bowman';
import Magician from '../js/characters/magician';
import Swordsman from '../js/characters/swordsman';

const dataList = [
  [
    Swordsman, 17, [2, 1],
    ['div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-top',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-top',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center']],
  [
    Bowman, 41, [5, 1],
    ['div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-bottom',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-bottom',
      'div.cell.map-tile.map-tile-center']],
  [
    Magician, 9, [1, 1],
    ['div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-top',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-top-left',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-top']],
];

const handler = test.each(dataList);

handler('char movement', (CharClass, cell, coord, expected) => {
  const gamePlay = new GamePlay();

  gamePlay.gameState.board = [['div.cell.map-tile.map-tile-top-left', 'div.cell.map-tile.map-tile-top', 'div.cell.map-tile.map-tile-top', 'div.cell.map-tile.map-tile-top', 'div.cell.map-tile.map-tile-top', 'div.cell.map-tile.map-tile-top', 'div.cell.map-tile.map-tile-top', 'div.cell.map-tile.map-tile-top-right'],
    ['div.cell.map-tile.map-tile-left', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-right'],
    ['div.cell.map-tile.map-tile-left', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-right'],
    ['div.cell.map-tile.map-tile-left', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-right'],
    ['div.cell.map-tile.map-tile-left', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-right'],
    ['div.cell.map-tile.map-tile-left', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-right'],
    ['div.cell.map-tile.map-tile-left', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-center', 'div.cell.map-tile.map-tile-right'],
    ['div.cell.map-tile.map-tile-bottom-left', 'div.cell.map-tile.map-tile-bottom', 'div.cell.map-tile.map-tile-bottom', 'div.cell.map-tile.map-tile-bottom', 'div.cell.map-tile.map-tile-bottom', 'div.cell.map-tile.map-tile-bottom', 'div.cell.map-tile.map-tile-bottom', 'div.cell.map-tile.map-tile-bottom-right'],
  ];

  const char = new CharClass(1);
  const positionedChar = {
    character: char,
    position: cell,
  };

  const movement = gamePlay.getMovement(coord[0], coord[1], positionedChar);
  expect(movement).toEqual(expected);
});
