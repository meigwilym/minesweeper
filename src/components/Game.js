import React from 'react';
import Board from './Board';
import Clock from './Clock';
import FlagDisplay from './FlagDislay';
import GameButton from './GameButton';
import gameStatus from '../gameStatus';
import { gameTypes, gameDimensions } from '../gameTypes';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameStatus: gameStatus.yetToStart,
            flagCount: 0,
            gameType: gameTypes.beginner
        };
    }

    handleGameOver(result) {
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
            flagCount: 0
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
                    gameStatus={this.state.gameStatus}
                    startGame={this.startGame.bind(this)}
                    flagCount={this.handleFlagCount.bind(this)}
                    onGameOver={this.handleGameOver.bind(this)} />
            </div>
        );
    }
}