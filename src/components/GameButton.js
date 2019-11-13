import React from 'react';
import gameStatus from '../gameStatus';

export default function GameButton(props) {
    let gameButton;
    switch (props.gameStatus) {
        case gameStatus.yetToStart:
            gameButton = 'Let\'s Play';
            break;
        case gameStatus.inProgress:
            gameButton = 'Game On!';
            break;
        case gameStatus.lose:
            gameButton = 'You Lose!';
            break;
        case gameStatus.win:
            gameButton = 'You Win!';
            break;
        default:
            gameButton = 'Default';
    }
    return (
        <span id="gameButton" className="btn" onClick={props.onClick}>{gameButton}</span>
    );
}