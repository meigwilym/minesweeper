import React from 'react';
import Tile from './Tile';
import { getNeighbours, getElementXY, createBoard } from '../helpers';
import gameStatus from '../gameStatus';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gameStatus: props.gameStatus,
            tiles: createBoard(this.props.width, this.props.height, this.props.mines),
            flags: 0 // number of flags
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // check for win
        if (this.props.gameStatus === gameStatus.inProgress) {
            const totalTiles = this.props.height * this.props.width;
            const tilesRevealedCount = this.state.tiles.flat().filter(v => v.isRevealed).length;
            if (this.props.mines === (totalTiles - tilesRevealedCount)) {
                this.props.onGameOver(gameStatus.win);
            }
        }
        // generate new tiles when !yetToStart -> yetToStart
        if (prevProps.gameStatus !== gameStatus.yetToStart && this.props.gameStatus === gameStatus.yetToStart) {
            this.setState({
                tiles: createBoard(this.props.width, this.props.height, this.props.mines)
            });
        }
    }

    // reveal a tile, and if it's empty, reveal its neighbours
    reveal(x, y, recursion = false) {
        this.setState(state => {
            state.tiles[x][y].isRevealed = true;
            return state;
        }, () => {
            if (recursion) {
                return;
            }
            if (this.state.tiles[x][y].mine) {
                // @todo show all other mines
                this.revealBombs();
                this.props.onGameOver(gameStatus.lose);
                return;
            }

            if (this.state.tiles[x][y].nearbyMines === 0) {
                this.revealNeighbours(x, y);
            }
        });
    }

    revealNeighbours(x, y) {
        const neighbours = getNeighbours(this.state.tiles, x, y);
        for (const tile of neighbours) {
            if (!tile.isRevealed && !tile.hasFlag) {
                this.reveal(tile.x, tile.y);
            }
        }
    }

    revealBombs() {
        const tiles = this.state.tiles.flat().filter(v => v.mine);
        for (const tile of tiles) {
            this.reveal(tile.x, tile.y, true);
        }
    }

    countFlag(x, y) {
        if (this.state.tiles[x][y].isRevealed) {
            return;
        }
        this.setState(state => {
            state.tiles[x][y].hasFlag = !state.tiles[x][y].hasFlag;
            return state;
        }, () => {
            const amount = this.state.tiles[x][y].hasFlag ? 1 : -1;
            this.props.flagCount(amount);
        });
    }

    leftClick(e) {
        const{ x, y } = getElementXY(e.currentTarget);
        const tile = this.state.tiles[x][y];
        if (this.props.gameStatus === gameStatus.yetToStart) {
            this.props.startGame();
        }
        if (tile.hasFlag || this.isGameOver()) {
            return;
        }
        this.reveal(x, y);
    }

    rightClick(e) {
        e.preventDefault();
        const{ x, y } = getElementXY(e.currentTarget);
        const tile = this.state.tiles[x][y];
        if (tile.isRevealed || this.isGameOver()) {
            return;
        }
        this.countFlag(x, y);
    }

    doubleClick(e) {
        if (this.isGameOver()) {
            return;
        }
        const{ x, y } = getElementXY(e.currentTarget);
        this.revealNeighbours(x, y);
    }

    isGameOver() {
        return this.props.gameStatus === gameStatus.win || this.props.gameStatus === gameStatus.lose;
    }

    render() {
        return (
            <table id="board">
                <tbody>
                    {this.state.tiles.map((row, i) => {
                        return (
                            <tr key={i}>
                                {row.map((v, j) => (
                                    <Tile
                                        value={v}
                                        key={v.x * row.length + v.y}
                                        leftClick={this.leftClick.bind(this)}
                                        rightClick={this.rightClick.bind(this)}
                                        doubleClick={this.doubleClick.bind(this)} />)
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}