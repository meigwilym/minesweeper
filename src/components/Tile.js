import React from 'react';

export default class Tile extends React.Component {

    /**
     * Props:
     * - mine: boolean
     * - x: integer, x coordinate
     * - y: integer, y coordinate
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            isRevealed: false,
            hasFlag: false,
            nearbyMines: 0
        };
    }

    leftClick() {
        if (!this.state.isRevealed) {
            this.setState({
                isRevealed: true
            });
        }
        if (this.props.mine) {
            // boom!
        } else if (this.state.nearbyMines == 0) {
            // click all neighbouring tiles
        }
    }

    rightClick() {
        if (!this.state.isRevealed) {
            this.setState({
                hasFlag: !this.state.hasFlag
            });
        }
    }

    doubleClick() {
        // click on all neighbouring tiles
    }

    render() {
        return (this.state.isRevealed) ? this.renderRevealed() : this.renderHidden();
    }

    renderRevealed() {
        const { nearbyMines } = this.state;
        return (
            <td className="tile revealed">
                <div>
                    { this.props.hasMine ? (
                        '💣'
                    ) : (
                        (nearbyMines > 0) ? nearbyMines : ''
                    )}
                </div>
            </td>
        );
    }

    renderHidden() {
        const { hasFlag } = this.state;
        return (
            <td className="tile hidden">
                <div>{ hasFlag ? '🚩' : '' }</div>
            </td>
        );
    }
}