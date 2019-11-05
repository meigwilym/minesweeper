import React from 'react';
import Tile from './Tile';
import BoardRow from './BoardRow';

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameOver: false,
            tiles: this.newBoard()
        };
    }

    newBoard() {
        const tiles = [];
        for (let i = 0; i < this.props.width; i++) {
            const row = []
            for (let j = 0; j < this.props.height; j++) {
                let tile = { x: i, y: j, mine: false };
                row.push(tile);
            }
            tiles.push(row);
        }
        return tiles;
    }

    render() {
        const tiles = this.state.tiles
        return (
            <table>
                <tbody>
                    {tiles.map((v, i) => <BoardRow key={i} tiles={v} />) }
                </tbody>
            </table>
        );
    }
}