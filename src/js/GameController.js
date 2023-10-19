/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

import themes from './themes';
import { playerTypes, enemyTypes, generateTeam } from './generators';
import Team from './Team';
import PositionedCharacter from './PositionedCharacter';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;

    this.onCellClick = this.onCellClick.bind(this);
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

  init(lvl, oldTeam) {
    if (localStorage.length !== 0 && lvl === undefined
      && oldTeam === undefined) {
      this.onLoadGame();
      this.events();
    } else {
      if (lvl === undefined) {
        lvl = 1;
      }
      const { gameState } = this.gamePlay;
      this.gamePlay.drawUi(themes[lvl]);

      const playerTeam = new Team(generateTeam(playerTypes, gameState.maxLevel, 2));
      const enemyTeam = new Team(generateTeam(enemyTypes, gameState.maxLevel, 2));
      this.gamePlay.board = this.board();

      const playerPos = [];
      const enemyPos = [];

      this.gamePlay.board.forEach((row) => {
        playerPos.push(this.gamePlay.cells.indexOf(row[0]), this.gamePlay.cells.indexOf(row[1]));
        enemyPos.push(this.gamePlay.cells.indexOf(row[6]), this.gamePlay.cells.indexOf(row[7]));
      });

      gameState.playerTeam = GameController.teamFormation(playerTeam, playerPos);
      gameState.enemyTeam = GameController.teamFormation(enemyTeam, enemyPos);
      if (oldTeam) {
        gameState.playerTeam = oldTeam;
      }
      gameState.allPositions = [...gameState.playerTeam, ...gameState.enemyTeam];

      this.gamePlay.redrawPositions(gameState.allPositions);
      this.events();
    }
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
    this.onNewGame = this.onNewGame.bind(this);
    this.onSaveGame = this.onSaveGame.bind(this);
    this.onLoadGame = this.onLoadGame.bind(this);

    this.gamePlay.addNewGameListener(this.onNewGame);
    this.gamePlay.addSaveGameListener(this.onSaveGame);
    this.gamePlay.addLoadGameListener(this.onLoadGame);

    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  onCellClick(index) {
    let turnConfirm;
    const gamestate = this.gamePlay.gameState;
    const enemies = ['vampire', 'daemon', 'undead'];
    const cell = this.gamePlay.cells[index];

    if (cell.firstChild !== null && gamestate.turn) {
      let selectedChar;
      for (const char of gamestate.allPositions) {
        if (char.position === index) {
          selectedChar = char;
        }
      }
      turnConfirm = this.gamePlay.playerTurn(selectedChar);
    }

    if (turnConfirm) {
      this.gamePlay.selectCell(index);
      this.gamePlay.calculateArea(index);
      this.gamePlay.paintAreas();
    } else if (gamestate.charChosen && cell.firstChild === null) {
      if (this.gamePlay.moveChar(index)) {
        this.gamePlay.updateTeams();
        this.enemyPhase();
      }
    } else if (gamestate.charChosen && cell.firstChild !== null
      && enemies.includes(cell.firstChild.classList[1])) {
      let turnDone = false;
      this.gamePlay.atkChar(index).then(() => {
        if (this.victoryCheck()) {
          this.gamePlay.cleanTurn();
          gamestate.turn = true;
          turnDone = true;
        }
        if (turnDone === false) {
          this.gamePlay.updateTeams();
          this.enemyPhase();
        }
      }, () => {
        this.gamePlay.constructor.showError('На этой клетке нельзя провести атаку');
      });
    } else {
      this.gamePlay.constructor.showError('Выберите персонажа из вашей команды');
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

  enemyPhase() {
    const gamestate = this.gamePlay.gameState;
    this.gamePlay.setCursor('auto');
    this.gamePlay.changeTurn();
    const enemyChar = gamestate.chosenChar;
    this.gamePlay.calculateArea(enemyChar.position);

    gamestate.enemyTarget = gamestate.playerTeam.reduce((prev, current) => ((prev && prev.character.defence < current.character.defence) ? prev : current));

    const attackIndexes = [];
    enemyChar.attackDist.forEach((cell) => {
      attackIndexes.push(this.gamePlay.cells.indexOf(cell));
    });

    if (attackIndexes.includes(gamestate.enemyTarget.position)) {
      this.enemyAtk();
    } else {
      this.enemyMovement(enemyChar);
    }
  }

  enemyMovement(enemyChar) {
    const gamestate = this.gamePlay.gameState;
    const playerPositions = [];
    gamestate.allPositions.forEach((char) => {
      const coord = this.gamePlay.calcCoordinates(char.position);
      playerPositions.push(JSON.stringify(coord));
    });

    const targetCoord = this.gamePlay.calcCoordinates(gamestate.enemyTarget.position);
    const cellCoords = {};
    let shortestDistance;
    let closest;

    for (let i = 0; i < enemyChar.movementDist.length; i += 1) {
      const cellIndex = this.gamePlay.cells.indexOf(enemyChar.movementDist[i]);
      cellCoords[i] = this.gamePlay.calcCoordinates(cellIndex);
    }

    for (const value of Object.values(cellCoords)) {
      const distance = GameController.distance(targetCoord, value);
      if ((shortestDistance === undefined || distance < shortestDistance)
      && !playerPositions.includes(JSON.stringify(value))) {
        closest = this.gamePlay.board[value[0]][value[1]];
        shortestDistance = distance;
      }
    }

    GameController.delay(1000).then(() => {
      this.gamePlay.moveChar(this.gamePlay.cells.indexOf(closest));
      this.gamePlay.changeTurn();
    });
  }

  static distance(targetCoord, value) {
    const diffX = targetCoord[0] - value[0];
    const diffY = targetCoord[1] - value[1];
    return (diffX * diffX + diffY * diffY);
  }

  enemyAtk() {
    GameController.delay(1000).then(() => {
      this.gamePlay.atkChar(this.gamePlay.gameState.enemyTarget.position).then(() => {
        if (!this.lossCheck()) {
          this.gamePlay.changeTurn();
        }
      });
    });
  }

  static delay(time) {
    return new Promise((resolve) => { setTimeout(resolve, time); });
  }

  victoryCheck() {
    if (Object.keys(this.gamePlay.gameState.enemyTeam).length === 0) {
      alert('Уровень пройден!');
      this.gamePlay.gameState.playerTeam.forEach((char) => {
        if (char.character.level < this.gamePlay.gameState.maxLevel) {
          GamePlay.levelUp(char.character);
          char.character.level += 1;
        }
      });
      if (this.gamePlay.gameState.lvl < 4) {
        this.gamePlay.gameState.lvl += 1;
        this.removeBoardEvents();
        this.removeControlEvents();
        this.init(this.gamePlay.gameState.lvl, this.gamePlay.gameState.playerTeam);
        return true;
      }
      alert('Поздравляем! Вы прошли игру!');
      this.removeBoardEvents();
      return true;
    }
    return false;
  }

  lossCheck() {
    if (Object.keys(this.gamePlay.gameState.playerTeam).length === 0) {
      alert('Вы проиграли!');
      this.removeBoardEvents();
      return true;
    }
    return false;
  }

  removeBoardEvents() {
    this.gamePlay.cellClickListeners = [];
    this.gamePlay.cellEnterListeners = [];
    this.gamePlay.cellLeaveListeners = [];
  }

  removeControlEvents() {
    this.gamePlay.newGameListeners = [];
    this.gamePlay.saveGameListeners = [];
    this.gamePlay.loadGameListeners = [];
  }

  onNewGame() {
    this.removeBoardEvents();
    this.removeControlEvents();
    this.gamePlay.gameState.lvl = 1;
    this.init(this.gamePlay.gameState.lvl);
  }

  onSaveGame() {
    this.stateService.save(this.gamePlay.gameState);
  }

  onLoadGame() {
    let state;
    try {
      state = this.stateService.load();
    } catch (e) {
      this.gamePlay.constructor.showError(e);
    }
    if (state !== null) {
      this.gamePlay.gameState = state;
      this.gamePlay.drawUi(themes[this.gamePlay.gameState.lvl]);
      this.gamePlay.redrawPositions(this.gamePlay.gameState.allPositions);
      this.gamePlay.board = this.board();
    }
  }
}
