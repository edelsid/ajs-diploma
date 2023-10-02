export default class GameState {
  constructor() {
    this.turn = true;
  }

  /* static from(object) {
    // TODO: create object
    return null;
  } */

  changeTurn() {
    /* this.turn = !this.turn; */
    this.charChosen = false;
    delete this.chosenChar.attackDist;
    delete this.chosenChar.movementDist;
    this.chosenChar = {};

    this.board.forEach((row) => {
      row.forEach((cell) => {
        cell.classList.remove('selected', 'selected-movement', 'selected-attack', 'selected-yellow', 'selected-green', 'selected-red');
      });
    });

    /* alert ('Ход противника'); */
  }

  playerTurn(char) {
    const playerTypes = ['bowman', 'swordsman', 'magician'];
    let turnConfirm;
    playerTypes.forEach((type) => {
      if (char.character.type === type) {
        turnConfirm = true;
        this.charChosen = true;
        this.chosenChar = char;
      }
    });
    return turnConfirm;
  }

  enemyTurn() {

  }
}
