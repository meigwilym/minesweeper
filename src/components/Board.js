import React from 'react';
import Tile from './Tile';
import gameEvents from '../gameEvents';
import { getNeighbours } from '../helpers';
import gameStatus from '../gameStatus';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gameStatus: props.gameStatus,
            tiles: props.tiles,
            flags: 0 // number of flags
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkWin();
        if(this.state.tiles !== this.props.tiles ) {
            this.setState({
                tiles: this.props.tiles
            });
        }
    }

    handleEvent(event, props) {
        switch (event) {
            case gameEvents.reveal:
                this.reveal(props.x, props.y);
                break;
            case gameEvents.addflag:
                this.countFlag(props);
                break;
            case gameEvents.neighbours:
                this.revealNeighbours(props.x, props.y);
                break;
            default:
                console.log('handling event board default', event, props);
        }
    }

    reveal(x, y) {
        this.setState(state => {
            state.tiles[x][y].isRevealed = true;
            return state;
        }, () => {

            if (this.state.tiles[x][y].mine) {
                this.props.onGameOver(gameStatus.lose);
                return;
            }

            if (this.state.tiles[x][y].nearbyMines === 0) {
                this.revealNeighbours(x, y);
            }
        });
    }

    checkWin() {
        const totalTiles = this.props.height * this.props.width;
        if (this.props.mines === (totalTiles - this.getTilesRevealed())) {
            this.props.onGameOver(gameStatus.win);
        }
    }

    revealNeighbours(x, y) {
        const neighbours = getNeighbours(this.state.tiles, x, y);
        for (const tile of neighbours) {
            if (!tile.isRevealed && !tile.hasFlag) {
                this.reveal(tile.x, tile.y);
            }
        }
    }

    getTilesRevealed() {
        return this.state.tiles.flat().filter(v => v.isRevealed).length;
    }

    countFlag(props) {
        if (this.state.tiles[props.x][props.y].isRevealed) {
            return;
        }
        this.setState(state => {
            state.tiles[props.x][props.y].hasFlag = !state.tiles[props.x][props.y].hasFlag;
            return state;
        }, () => {
            const amount = this.state.tiles[props.x][props.y].hasFlag ? 1 : -1;
            this.props.flagCount(amount);
        });
    }

    leftClick(e) {
        if (this.props.gameStatus === gameStatus.yetToStart) {
            this.props.startGame();
        }
    }

    rightClick() {

    }

    doubleClick() {

    }

    render() {
        return (
            <table id="board">
                <tbody>
                    {this.renderBoardRow()}
                </tbody>
            </table>
        );
    }

    renderBoardRow() {
        return this.state.tiles.map((row, i) => {
            return (
                <tr key={i}>
                    {row.map((v, j) => (
                        <Tile value={v} key={j}
                            handleEvent={this.handleEvent.bind(this)}
                            leftClick={this.leftClick.bind(this)}
                            rightClick={this.rightClick.bind(this)}
                            doubleClick={this.doubleClick.bind(this)} />)
                    )}
                </tr>
            );
        });
    }
}