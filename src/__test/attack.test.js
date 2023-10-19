import GamePlay from '../js/GamePlay';
import Bowman from '../js/characters/bowman';
import Magician from '../js/characters/magician';
import Swordsman from '../js/characters/swordsman';

const dataList = [
  [
    Swordsman, 25, [3, 1],
    ['div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center']],
  [
    Bowman, 40, [5, 0],
    ['div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-bottom-left',
      'div.cell.map-tile.map-tile-bottom',
      'div.cell.map-tile.map-tile-bottom']],
  [
    Magician, 0, [0, 0],
    ['div.cell.map-tile.map-tile-top-left',
      'div.cell.map-tile.map-tile-top',
      'div.cell.map-tile.map-tile-top',
      'div.cell.map-tile.map-tile-top',
      'div.cell.map-tile.map-tile-top',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-left',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center',
      'div.cell.map-tile.map-tile-center'],
  ],
];

const handler = test.each(dataList);

handler('char attack', (CharClass, cell, coord, expected) => {
  const gamePlay = new GamePlay();

  gamePlay.cells = ['div.cell.map-tile.map-tile-top-left',
    'div.cell.map-tile.map-tile-top',
    'div.cell.map-tile.map-tile-top',
    'div.cell.map-tile.map-tile-top',
    'div.cell.map-tile.map-tile-top',
    'div.cell.map-tile.map-tile-top',
    'div.cell.map-tile.map-tile-top',
    'div.cell.map-tile.map-tile-top-right',
    'div.cell.map-tile.map-tile-left',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-right',
    'div.cell.map-tile.map-tile-left',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-right',
    'div.cell.map-tile.map-tile-left',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-right',
    'div.cell.map-tile.map-tile-left',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-right',
    'div.cell.map-tile.map-tile-left',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-right',
    'div.cell.map-tile.map-tile-left',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-center',
    'div.cell.map-tile.map-tile-right',
    'div.cell.map-tile.map-tile-bottom-left',
    'div.cell.map-tile.map-tile-bottom',
    'div.cell.map-tile.map-tile-bottom',
    'div.cell.map-tile.map-tile-bottom',
    'div.cell.map-tile.map-tile-bottom',
    'div.cell.map-tile.map-tile-bottom',
    'div.cell.map-tile.map-tile-bottom',
    'div.cell.map-tile.map-tile-bottom-right'];

  const arr = Array.from(gamePlay.cells);
  const board = [];
  for (let i = 1; i < 9; i += 1) {
    const row = arr.splice(0, 8);
    board.push(row);
  }
  gamePlay.board = board;

  const char = new CharClass(1);
  const positionedChar = {
    character: char,
    position: cell,
  };

  const attack = gamePlay.getAttack(coord[0], coord[1], positionedChar);
  expect(attack).toEqual(expected);
});
