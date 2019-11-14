import React from 'react';

export default function FlagDisplay({ flags }) {
    let printedFlag = flags.toString();
    if (flags < 10) {
        printedFlag = `0${printedFlag}`;
    }
    return (
        <div id="FlagDisplay">
            {printedFlag}
        </div>);
}
