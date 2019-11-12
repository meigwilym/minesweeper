import React from 'react';
import gameEvents from '../gameEvents';

export default class Tile extends React.Component {

    leftClick() {
        if (this.props.gameOver || this.props.value.hasFlag || this.props.value.isRevealed) {
            return;
        }
        this.props.leftClick();
        this.props.handleEvent(gameEvents.reveal, this.props.value);
    }

    rightClick(e) {
        e.preventDefault();
        if (this.props.gameOver || this.props.value.isRevealed) {
            return;
        }

        this.props.handleEvent(gameEvents.addflag, this.props.value);
    }

    doubleClick() {
        if (this.props.gameOver) {
            return;
        }
        this.props.handleEvent(gameEvents.neighbours, this.props.value);
    }

    render() {
        return (this.props.value.isRevealed === true) ? this.renderRevealed() : this.renderHidden();
    }

    renderRevealed() {
        const { nearbyMines, mine } = this.props.value;
        const nearbyMinesClass = `nearbymines-${nearbyMines}`;
        return (
            <td className="tile revealed" onDoubleClick={this.doubleClick.bind(this)} onContextMenu={this.rightClick.bind(this)}>
                <div>
                    { mine ? (
                        <span className="mine" role="img" aria-label="bomb">💣</span>
                    ) : (
                        (nearbyMines > 0) ? <span className={nearbyMinesClass}>{nearbyMines}</span> : ''
                    )}
                </div>
            </td>
        );
    }

    renderHidden() {
        const { hasFlag } = this.props.value;
        return (
            <td className="tile hidden" onClick={this.leftClick.bind(this)} onContextMenu={this.rightClick.bind(this)}>
                <div>{ hasFlag ? <span className="flag" role="img" aria-label="flag">🚩</span> : '' }</div>
            </td>
        );
    }
}