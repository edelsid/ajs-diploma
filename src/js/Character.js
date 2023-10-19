/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  // eslint-disable-next-line no-unused-vars
  constructor(level, type = 'generic') {
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.level = level;
    if (new.target.name === 'Character') {
      throw new Error('Воспользуйтесь конструктором через класс персонажа');
    }
    // TODO: выбросите исключение, если кто-то использует "new Character()"
  }
}
