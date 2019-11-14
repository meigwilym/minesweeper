import React from 'react';

export default function Tile(props) {
    const { isRevealed, hasFlag, nearbyMines, mine, x, y } = props.value;
        
    if (isRevealed) {
        const nearbyMinesClass = `nearbymines-${nearbyMines}`;
        return (
            <td className="tile revealed" data-x={x} data-y={y} onDoubleClick={props.doubleClick} onContextMenu={props.rightClick}>
                <div>
                    { mine ? (
                        <span className="mine" role="img" aria-label="bomb">💣</span>
                    ) : (
                        (nearbyMines > 0) ? <span className={nearbyMinesClass}>{nearbyMines.toString()}</span> : ''
                    )}
                </div>
            </td>
        );
    } else {
        return (
            <td className="tile hidden" data-x={x} data-y={y} onClick={props.leftClick} onContextMenu={props.rightClick}>
                <div>{ hasFlag ? <span className="flag" role="img" aria-label="flag">🚩</span> : '' }</div>
            </td>
        );
    }
}