import { calcTileType } from '../js/utils';

const dataList = [
  [0, 8, 'top-left'],
  [7, 8, 'top-right'],
  [1, 8, 'top'],
  [56, 8, 'bottom-left'],
  [63, 8, 'bottom-right'],
  [62, 8, 'bottom'],
  [10, 8, 'center'],
  [15, 8, 'right'],
  [16, 8, 'left'],
];

const handler = test.each(dataList);

handler('testing area creation', (index, boardSize, expected) => {
  const position = calcTileType(index, boardSize);
  expect(position).toBe(expected);
});
