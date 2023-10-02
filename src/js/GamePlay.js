import { calcHealthLevel, calcTileType } from './utils';
import GameState from './GameState';

export default class GamePlay {
  constructor() {
    this.boardSize = 8;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.cellEnterListeners = [];
    this.cellLeaveListeners = [];
    this.newGameListeners = [];
    this.saveGameListeners = [];
    this.loadGameListeners = [];
    this.gameState = new GameState();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  /**
   * Draws boardEl with specific theme
   *
   * @param theme
   */
  drawUi(theme) {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="controls">
        <button data-id="action-restart" class="btn">New Game</button>
        <button data-id="action-save" class="btn">Save Game</button>
        <button data-id="action-load" class="btn">Load Game</button>
      </div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.newGameEl = this.container.querySelector('[data-id=action-restart]');
    this.saveGameEl = this.container.querySelector('[data-id=action-save]');
    this.loadGameEl = this.container.querySelector('[data-id=action-load]');

    this.newGameEl.addEventListener('click', (event) => this.onNewGameClick(event));
    this.saveGameEl.addEventListener('click', (event) => this.onSaveGameClick(event));
    this.loadGameEl.addEventListener('click', (event) => this.onLoadGameClick(event));

    this.boardEl = this.container.querySelector('[data-id=board]');

    this.boardEl.classList.add(theme);
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', 'map-tile', `map-tile-${calcTileType(i, this.boardSize)}`);
      cellEl.addEventListener('mouseenter', (event) => this.onCellEnter(event));
      cellEl.addEventListener('mouseleave', (event) => this.onCellLeave(event));
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  /**
   * Draws positions (with chars) on boardEl
   *
   * @param positions array of PositionedCharacter objects
   */
  redrawPositions(positions) {
    for (const cell of this.cells) {
      cell.innerHTML = '';
    }

    for (const position of positions) {
      const cellEl = this.boardEl.children[position.position];
      const charEl = document.createElement('div');
      charEl.classList.add('character', position.character.type);

      const healthEl = document.createElement('div');
      healthEl.classList.add('health-level');

      const healthIndicatorEl = document.createElement('div');
      healthIndicatorEl.classList.add('health-level-indicator', `health-level-indicator-${calcHealthLevel(position.character.health)}`);
      healthIndicatorEl.style.width = `${position.character.health}%`;
      healthEl.appendChild(healthIndicatorEl);

      charEl.appendChild(healthEl);
      cellEl.appendChild(charEl);
    }
  }

  /**
   * Add listener to mouse enter for cell
   *
   * @param callback
   */
  addCellEnterListener(callback) {
    this.cellEnterListeners.push(callback);
  }

  /**
   * Add listener to mouse leave for cell
   *
   * @param callback
   */
  addCellLeaveListener(callback) {
    this.cellLeaveListeners.push(callback);
  }

  /**
   * Add listener to mouse click for cell
   *
   * @param callback
   */
  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  /**
   * Add listener to "New Game" button click
   *
   * @param callback
   */
  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  /**
   * Add listener to "Save Game" button click
   *
   * @param callback
   */
  addSaveGameListener(callback) {
    this.saveGameListeners.push(callback);
  }

  /**
   * Add listener to "Load Game" button click
   *
   * @param callback
   */
  addLoadGameListener(callback) {
    this.loadGameListeners.push(callback);
  }

  onCellEnter(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellEnterListeners.forEach((o) => o.call(this, index));
  }

  onCellLeave(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellLeaveListeners.forEach((o) => o.call(this, index));
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((o) => o.call(this, index));
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach((o) => o.call(null));
  }

  onSaveGameClick(event) {
    event.preventDefault();
    this.saveGameListeners.forEach((o) => o.call(null));
  }

  onLoadGameClick(event) {
    event.preventDefault();
    this.loadGameListeners.forEach((o) => o.call(null));
  }

  static showError(message) {
    alert(message);
  }

  static showMessage(message) {
    alert(message);
  }

  selectCell(index, color = 'yellow') {
    this.deselectCell(index);
    this.cells[index].classList.add('selected', `selected-${color}`);
  }

  deselectCell(index) {
    const cell = this.cells[index];
    cell.classList.remove(...Array.from(cell.classList)
      .filter((o) => o.startsWith('selected')));
  }

  showCellTooltip(message, index) {
    this.cells[index].title = message;
  }

  hideCellTooltip(index) {
    this.cells[index].title = '';
  }

  showDamage(index, damage) {
    return new Promise((resolve) => {
      const cell = this.cells[index];
      const damageEl = document.createElement('span');
      damageEl.textContent = damage;
      damageEl.classList.add('damage');
      cell.appendChild(damageEl);

      damageEl.addEventListener('animationend', () => {
        cell.removeChild(damageEl);
        resolve();
      });
    });
  }

  setCursor(cursor) {
    this.boardEl.style.cursor = cursor;
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  tooltipFormation(index) {
    let message = '';
    this.allPositions.forEach((char) => {
      if (char.position === index) {
        message = `\u{1F396}${char.character.level} \u{2694}${char.character.attack} \u{1F6E1}${char.character.defence} \u{2764}${char.character.health}`;
      }
    });
    return message;
  }

  onCharSelected(index) {
    const enemyTypes = ['vampire', 'daemon', 'undead'];
    this.setCursor('pointer');
    const cell = this.cells[index];

    if (this.gameState.chosenChar.attackDist.includes(cell) && cell.firstChild !== null && enemyTypes.includes(cell.firstChild.classList[1])) {
      this.setCursor('crosshair');
      cell.classList.add('selected', 'selected-red');
      return false;
    } if (cell.firstChild !== null && enemyTypes.includes(cell.firstChild.classList[1])) {
      this.setCursor('not-allowed');
      return false;
    } if (this.gameState.chosenChar.movementDist.includes(cell)) {
      this.setCursor('pointer');
      cell.classList.add('selected', 'selected-green');
    }
    return false;
  }

  getMovement(x, y, char) {
    let movement = [];

    if (char.character.type === 'magician' || char.character.type === 'daemon') {
      movement = this.calcCells(x, y, movement, 1);
    } else if (char.character.type === 'bowman' || char.character.type === 'vampire') {
      for (let i = 1; i <= 2; i += 1) {
        movement = this.calcCells(x, y, movement, i);
      }
    } else if (char.character.type === 'swordsman' || char.character.type === 'undead') {
      for (let i = 1; i <= 4; i += 1) {
        movement = this.calcCells(x, y, movement, i);
      }
    }
    return movement;
  }

  getAttack(x, y, char) {
    let attack = [];
    const { board } = this.gameState;

    if (char.character.type === 'swordsman' || char.character.type === 'undead') {
      attack = this.calcCells(x, y, attack, 1);
    } else if (char.character.type === 'bowman' || char.character.type === 'vampire') {
      for (let i = Math.max(0, x - 2); i <= x + 2; i += 1) {
        for (let j = Math.max(0, y - 2); j <= y + 2; j += 1) {
          if (i <= 7 && j <= 7 && board[i][j] !== undefined) {
            attack.push(board[i][j]);
          }
        }
      }
    } else if (char.character.type === 'magician' || char.character.type === 'daemon') {
      for (let i = Math.max(0, x - 4); i <= x + 4; i += 1) {
        for (let j = Math.max(0, y - 4); j <= y + 4; j += 1) {
          if (i <= 7 && j <= 7 && board[i][j] !== undefined) {
            attack.push(board[i][j]);
          }
        }
      }
    }
    return attack;
  }

  calcCells(x, y, value, coef) {
    const { board } = this.gameState;

    /* const standardRadius = {
      'top': {'code': board[x][y + coef], 'req': y + coef <= 7},
      'bottom': {'code': board[x][y - coef], 'req': y - coef >= 0},
      'left': {'code': board[x - coef][y], 'req': x - coef >= 0},
      'right': {'code': board[x + coef][y], 'req': x + coef <= 7},
      'top-left': {'code': board[x - coef][y - coef], 'req': x - coef >= 0 && y - coef >= 0},
      'top-right': {'code': board[x + coef][y - coef], 'req': x + coef <= 7 && y - coef >= 0},
      'bottom-left': {'code': board[x - coef][y + coef], 'req': y + coef <= 7 && x - coef >= 0},
      'bottom-right': {'code': board[x + coef][y + coef], 'req': y + coef <= 7 && x + coef <= 7}
    }

    for (let el of Object.values(standardRadius)) {
      if (el.code !== undefined && el.req) {
        value.push(el.code);
      }
    } */

    if (y - coef >= 0 && board[x][y - coef] !== undefined) {
      value.push(board[x][y - coef]);
    }
    if (y + coef <= 7 && board[x][y + coef] !== undefined) {
      value.push(board[x][y + coef]);
    }
    if (x + coef <= 7 && board[x + coef][y] !== undefined) {
      value.push(board[x + coef][y]);
    }
    if (x - coef >= 0 && board[x - coef][y] !== undefined) {
      value.push(board[x - coef][y]);
    }
    if (y + coef <= 7 && x + coef <= 7 && board[x + coef][y + coef] !== undefined) {
      value.push(board[x + coef][y + coef]);
    }
    if (x - coef >= 0 && y - coef >= 0 && board[x - coef][y - coef] !== undefined) {
      value.push(board[x - coef][y - coef]);
    }
    if (x + coef <= 7 && y - coef >= 0 && board[x + coef][y - coef] !== undefined) {
      value.push(board[x + coef][y - coef]);
    }
    if (y + coef <= 7 && x - coef >= 0 && board[x - coef][y + coef] !== undefined) {
      value.push(board[x - coef][y + coef]);
    }

    return value;
  }

  calcCoordinates(index) {
    let coordinates;
    for (let y = 0; y < this.gameState.board.length; y += 1) {
      for (let x = 0; x < this.gameState.board[0].length; x += 1) {
        if (this.gameState.board[x][y] === this.cells[index]) {
          coordinates = [x, y];
        }
      }
    }
    return coordinates;
  }

  moveChar(index) {
    if (this.gameState.chosenChar.movementDist.includes(this.cells[index])) {
      this.gameState.chosenChar.position = index;
      this.redrawPositions(this.allPositions);
    } else {
      this.constructor.showError('На эту клетку нельзя передвинуться');
    }
  }

  atkChar(index) {
    const attacker = this.gameState.chosenChar.character;

    let target;
    for (const char of this.allPositions) {
      if (char.position === index) {
        target = char.character;
      }
    }

    const damage = Math.max(attacker.attack - target.defence, attacker.attack * 0.1);
    const context = this;
    this.showDamage(index, damage).then(() => {
      target.health -= damage;
      context.redrawPositions(context.allPositions);
    });
  }
}
