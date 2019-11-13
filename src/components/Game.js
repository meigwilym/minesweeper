import React from 'react';
import Board from './Board';
import Clock from './Clock';
import FlagDisplay from './FlagDislay';
import GameButton from './GameButton';
import { createMines, getNeighbours } from '../helpers';
import gameStatus from '../gameStatus';
import { gameTypes, gameDimensions } from '../gameTypes';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameStatus: gameStatus.yetToStart,
            flagCount: 0,
            gameType: gameTypes.beginner,
            tiles: []
        };
        this.state.tiles = this.createTiles();
    }

    componentDidMount() {
        // this.newGame();
    }

    handleGameOver(result) {
        console.log('game over', result);
        if(this.state.gameStatus !== result) {
            this.setState({
                gameStatus: result
            });
        }
        if (this.state.gameStatus === gameStatus.win) {
            // localStorage.setItem('score', {});
        }
    }

    handleFlagCount(val) {
        this.setState({
            flagCount: this.state.flagCount + val
        });
    }

    newGame() {
        this.setState({
            gameStatus: gameStatus.yetToStart,
            tiles: this.createTiles(),
            flagCount: 0,
        });
    }

    startGame() {
        if (this.state.gameStatus === gameStatus.yetToStart) {
            this.setState({
                gameStatus: gameStatus.inProgress
            });
        }
    }

    render() {
        const { tiles } = this.state;
        const { height, width, mines } = gameDimensions[this.state.gameType];
        return (
            <div className="game">
                <h1>Minesweeper</h1>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <Clock gameStatus={this.state.gameStatus} />
                    <GameButton gameStatus={this.state.gameStatus} onClick={this.newGame.bind(this)} />
                    <FlagDisplay flags={this.state.flagCount} />
                </div>
                <Board
                    height={height}
                    width={width}
                    mines={mines}
                    tiles={tiles}
                    gameStatus={this.state.gameStatus}
                    startGame={this.startGame.bind(this)}
                    flagCount={this.handleFlagCount.bind(this)}
                    onGameOver={this.handleGameOver.bind(this)} />
            </div>
        );
    }

    createTiles() {
        const { width, height, mines } = gameDimensions[this.state.gameType];
        const boardMines = createMines(width, height, mines);
        const tiles = [];

        for (let i = 0; i < width; i++) {
            const row = [];
            for (let j = 0; j < height; j++) {
                row.push({
                    x: i,
                    y: j,
                    mine: (boardMines.hasOwnProperty(i) && boardMines[i].includes(j)),
                    nearbyMines: 0,
                    isRevealed: false,
                    hasFlag: false
                });
            }
            tiles.push(row);
        }

        // check for mines, and count
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (!tiles[i][j].mine) {
                    const neighbours = getNeighbours(tiles, i, j);
                    for (const neighbourTile of neighbours) {
                        if (neighbourTile.mine) {
                            tiles[i][j].nearbyMines = tiles[i][j].nearbyMines + 1;
                        }
                    }
                }
            }
        }

        return tiles;
    }
}