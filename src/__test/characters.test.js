import Character from '../js/Character';
import Bowman from '../js/characters/bowman';
import Daemon from '../js/characters/daemon';
import Magician from '../js/characters/magician';
import Swordsman from '../js/characters/swordsman';
import Undead from '../js/characters/undead';
import Vampire from '../js/characters/vampire';
import { characterGenerator, playerTypes, generateTeam } from '../js/generators';

test('error test', () => {
  expect(() => new Character(3)).toThrow('Воспользуйтесь конструктором через класс персонажа');
});

test('char creation', () => {
  const char = new Bowman(1);
  expect(char).toEqual({
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'bowman',
  });
});

const dataList = [
  [Bowman, 1, {
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'bowman',
  }],
  [Daemon, 1, {
    attack: 10,
    defence: 10,
    health: 50,
    level: 1,
    type: 'daemon',
  }],
  [Magician, 1, {
    attack: 10,
    defence: 40,
    health: 50,
    level: 1,
    type: 'magician',
  }],
  [Swordsman, 1, {
    attack: 40,
    defence: 10,
    health: 50,
    level: 1,
    type: 'swordsman',
  }],
  [Undead, 1, {
    attack: 40,
    defence: 10,
    health: 50,
    level: 1,
    type: 'undead',
  }],
  [Vampire, 1, {
    attack: 25,
    defence: 25,
    health: 50,
    level: 1,
    type: 'vampire',
  }],
];

const handler = test.each(dataList);

handler('characteristics', (CharClass, level, expected) => {
  const char = new CharClass(level);
  expect(char).toEqual(expected);
});

const genDataList = [
  [['bowman', 'swordsman', 'magician'], 'type'],
  [[25, 10, 40], 'attack'],
  [[25, 10, 40], 'defence'],
];

const genHandler = test.each(genDataList);

genHandler('generation', (arr, value) => {
  const playerGenerator = characterGenerator(playerTypes, 1);
  const charArr = [];
  for (let i = 0; i < 10; i += 1) {
    const char = playerGenerator.next().value;
    charArr.push(char);
  }
  charArr.forEach((element) => {
    expect(arr).toContain(element[value]);
  });
});

test('team generation count', () => {
  const playerTeam = generateTeam(playerTypes, 4, 5);
  expect(playerTeam.length).toBe(5);
});

test('team generation level', () => {
  const playerTeam = generateTeam(playerTypes, 4, 4);
  playerTeam.forEach((element) => {
    expect(element.level).toBeLessThanOrEqual(4);
  });
});
