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
    const playerPositions = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    const enemyPositions = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

    const positionedPlayers = GameController.teamFormation(playerTeam, playerPositions);
    const positionedEnemies = GameController.teamFormation(enemyTeam, enemyPositions);
    this.gamePlay.allPositions = [...positionedPlayers, ...positionedEnemies];

    this.gamePlay.redrawPositions(this.gamePlay.allPositions);
    this.events();
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  events() {
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  onCellClick(index) {
    // TODO: react to click
    let turnConfirm;
    if (this.cells[index].firstChild !== null && this.gameState.turn) {
      turnConfirm = this.gameState.playerTurn(this.cells[index].firstChild);
    } else if (this.cells[index].firstChild !== null && this.gameState.turn === false) {
      turnConfirm = this.gameState.enemyTurn(this.cells[index].firstChild);
    }
    if (turnConfirm) {
      this.selectCell(index);
    } else {
      this.constructor.showError('Выберите персонажа из вашей команды');
    }
  }

  onCellEnter(index) {
    if (this.cells[index].firstChild !== null) {
      this.showCellTooltip(this.tooltipFormation(index), index);
    }
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    this.hideCellTooltip(index);
    // TODO: react to mouse leave
  }
}
