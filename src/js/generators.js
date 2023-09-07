/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
import Bowman from './characters/bowman';
import Swordsman from './characters/swordsman';
import Magician from './characters/magician';
import Daemon from './characters/daemon';
import Undead from './characters/undead';
import Vampire from './characters/vampire';

export const playerTypes = [Bowman, Swordsman, Magician];
export const enemyTypes = [Daemon, Undead, Vampire];

export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const minLevel = 1;
  while (true) {
    const level = Math.floor(Math.random() * (maxLevel - minLevel) + minLevel);
    const character = new allowedTypes[Math.floor(Math.random() * allowedTypes.length)](level);
    yield character;
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const playerGenerator = characterGenerator(allowedTypes, maxLevel);
  const newTeam = [];
  for (let i = 0; i < characterCount; i += 1) {
    const character = playerGenerator.next().value;
    newTeam.push(character);
  }
  return newTeam;
}
