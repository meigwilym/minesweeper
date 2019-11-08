import React from 'react';
import Tile from './Tile';

export default class BoardRow extends React.Component {

    render() {
        return (
            <tr>
            { this.props.tiles.map((v, i) => <Tile x={v.x} y={v.y} mine={v.mine} key={i} />) }
            </tr>
        );
    }
}