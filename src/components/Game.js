import React from 'react';
import Board from './Board';
import Clock from './Clock';
import FlagDisplay from './FlagDislay';
import { createMines } from '../helpers';
import { getNeighbours } from '../helpers';
import gameStatus from '../gameStatus';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameOver: false,
            gameStatus: gameStatus.inProgress,
            flagCount: 0,
            beginner: {
                height: 9,
                width: 9,
                mines: 10
            },
            intermediate: {
                height: 16,
                width: 16,
                mines: 40
            },
            expert: {
                height: 16,
                width: 40,
                mines: 99
            }
        };
        this.state.tiles = this.createTiles();
    }

    handleGameOver(result) {
        console.log(result);
        if(this.state.gameStatus !== result) {
            this.setState({
                gameOver: true,
                gameStatus: result
            });
        }
    }

    handleFlagCount(val) {
        this.setState({
            flagCount: this.state.flagCount + val
        });
    }

    createTiles() {
        const { width, height, mines } = this.state.beginner;
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

    newGame() {
        console.log('new game');
        this.setState({
            gameOver: false,
            gameStatus: gameStatus.inProgress,
            tiles: this.createTiles(),
            flagCount: 0,
        });
    }

    render() {
        const { gameOver, tiles } = this.state;
        const { height, width, mines } = this.state.beginner;
        const gameButton = this.renderGameButton();
        return (
            <div className="game">
                <h1>Minesweeper</h1>
                <Clock tick={!this.state.gameOver} />
                <p><span className="btn" onClick={this.newGame.bind(this)}>{gameButton}</span></p>
                <FlagDisplay flags={this.state.flagCount} />
                <Board
                    height={height}
                    width={width}
                    mines={mines}
                    gameOver={gameOver}
                    tiles={tiles}
                    flagCount={this.handleFlagCount.bind(this)}
                    onGameOver={this.handleGameOver.bind(this)} />
            </div>
        );
    }

    renderGameButton() {
        if (this.state.gameStatus === gameStatus.inProgress) {
            return (<span className="btn" onClick={this.newGame.bind(this)}>Game On!</span>);
        } else if (this.state.gameStatus === gameStatus.lose) {
            return (<span className="btn" onClick={this.newGame.bind(this)}>Lose!</span>);
        } else if (this.state.gameStatus === gameStatus.win) {
            return (<span className="btn" onClick={this.newGame.bind(this)}>Win!</span>);
        }
    }
}