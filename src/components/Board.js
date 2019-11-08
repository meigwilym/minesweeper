import React from 'react';
import Tile from './Tile';
import gameEvents from '../gameEvents';
import { getNeighbours } from '../helpers';
import gameStatus from '../gameStatus';

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameOver: props.gameOver,
            tiles: props.tiles,
            flags: 0, // number of flags
            revealed: 0,
        };
    }

    componentDidUpdate() {
        this.checkWin();
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
        console.log(this.state.tiles[x][y]);
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
        });

        const amount = props.hasFlag ? -1 : 1;
        this.props.flagCount(amount);
    }

    renderBoardRow(tiles) {
        return tiles.map((row, i) => {
            return (
                <tr key={i}>
                    { row.map((v, j) => <Tile value={v} key={j} gameOver={this.props.gameOver} handleEvent={this.handleEvent.bind(this)} />) }
                </tr>
            );
        });
    }

    render() {
        const tiles = this.state.tiles
        return (
            <table id="board">
                <tbody>
                    {this.renderBoardRow(this.props.tiles)}
                </tbody>
            </table>
        );
    }
}