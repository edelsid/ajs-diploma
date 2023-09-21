export default class GameState {
  constructor() {
    this.turn = true;
  }

  /* static from(object) {
    // TODO: create object
    return null;
  } */

  changeTurn() {
    this.turn = !this.turn;
  }

  playerTurn(element) {
    const playerTypes = ['bowman', 'swordsman', 'magician'];
    let turnConfirm;
    playerTypes.forEach((type) => {
      if (element.classList.contains(type)) {
        turnConfirm = true;
      }
    });
    return turnConfirm;
  }

  enemyTurn(element) {
    const enemyTypes = ['vampire', 'daemon', 'undead'];
    let turnConfirm;
    enemyTypes.forEach((type) => {
      if (element.classList.contains(type)) {
        turnConfirm = true;
      }
    });
    return turnConfirm;
  }
}
