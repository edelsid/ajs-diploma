import themes from './themes';
import { playerTypes, enemyTypes, generateTeam } from './generators';
import Team from './Team';
import PositionedCharacter from './PositionedCharacter';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  teamFormation(team, positions) {
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

    const positionedPlayers = this.teamFormation(playerTeam, playerPositions);
    const positionedEnemies = this.teamFormation(enemyTeam, enemyPositions);
    const allPositions = [...positionedPlayers, ...positionedEnemies];

    this.gamePlay.redrawPositions(allPositions);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
