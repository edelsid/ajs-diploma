import themes from './themes';
import { playerTypes, enemyTypes, generateTeam } from './generators';
import Team from './Team';
import PositionedCharacter from './PositionedCharacter';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  static teamFormation(team, positions) {
    const positionedCharacters = [];

    for (let i = 0; i < team.characters.length; i += 1) {
      const position = positions[Math.floor(Math.random() * positions.length)];
      positions.splice(positions.indexOf(position), 1);
      const positionedCharacter = new PositionedCharacter(team.characters[i], position);
      positionedCharacters.push(positionedCharacter);
    }

    return positionedCharacters;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    const playerTeam = new Team(generateTeam(playerTypes, 4, 2));
    const enemyTeam = new Team(generateTeam(enemyTypes, 4, 2));
    this.gamePlay.gameState.board = this.board();

    const playerPositions = [];
    const enemyPositions = [];

    this.gamePlay.gameState.board.forEach((row) => {
      playerPositions.push(this.gamePlay.cells.indexOf(row[0]), this.gamePlay.cells.indexOf(row[1]));
      enemyPositions.push(this.gamePlay.cells.indexOf(row[6]), this.gamePlay.cells.indexOf(row[7]));
    });

    const positionedPlayers = GameController.teamFormation(playerTeam, playerPositions);
    const positionedEnemies = GameController.teamFormation(enemyTeam, enemyPositions);
    this.gamePlay.allPositions = [...positionedPlayers, ...positionedEnemies];

    this.gamePlay.redrawPositions(this.gamePlay.allPositions);
    this.events();
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  board() {
    const arr = Array.from(this.gamePlay.cells);
    const board = [];
    for (let i = 1; i < 9; i += 1) {
      const row = arr.splice(0, 8);
      board.push(row);
    }
    return board;
  }

  events() {
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  onCellClick(index) {
    let turnConfirm;
    const enemies = ['vampire', 'daemon', 'undead'];
    const cell = this.cells[index];

    if (cell.firstChild !== null && this.gameState.turn) {
      let selectedChar;
      for (const char of this.allPositions) {
        if (char.position === index) {
          selectedChar = char;
        }
      }
      turnConfirm = this.gameState.playerTurn(selectedChar);
    }

    if (turnConfirm) {
      this.selectCell(index);
      const coord = this.calcCoordinates(index);
      this.gameState.chosenChar.movementDist = this.getMovement(coord[0], coord[1], this.gameState.chosenChar);
      this.gameState.chosenChar.attackDist = this.getAttack(coord[0], coord[1], this.gameState.chosenChar, index);

      this.gameState.chosenChar.movementDist.forEach((el) => {
        el.classList.add('selected', 'selected-movement');
      });
      this.gameState.chosenChar.attackDist.forEach((el) => {
        el.classList.add('selected', 'selected-attack');
      });
    } else if (this.gameState.charChosen && cell.firstChild === null) {
      this.moveChar(index);
      this.gameState.changeTurn();
      this.setCursor('auto');
    } else if (this.gameState.charChosen && cell.firstChild !== null && enemies.includes(cell.firstChild.classList[1])) {
      this.atkChar(index);
      this.gameState.changeTurn();
      this.setCursor('auto');
    } else {
      this.constructor.showError('Выберите персонажа из вашей команды');
    }
  }

  onCellEnter(index) {
    if (this.cells[index].firstChild !== null) {
      this.showCellTooltip(this.tooltipFormation(index), index);
    }

    if (this.gameState.charChosen) {
      this.onCharSelected(index);
    }
  }

  onCellLeave(index) {
    this.hideCellTooltip(index);
    if (this.gameState.charChosen) {
      this.cells[index].classList.remove('selected-green', 'selected-red');
      this.setCursor('auto');
    }
  }
}
