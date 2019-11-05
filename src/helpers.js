// helper.js

export makeBoard(maxWidth, maxHeight, mineTotal) {
    const mineCoords = createMines(maxWidth, maxHeight, mineCoords);


}

export createMines(maxWidth, maxHeight, mineTotal) {
    mineCoords = [];
    for (let i = 0; i < mineTotal; i++) {
        let x = getRandomInt(maxWidth);
        let y = getRandomInt(maxHeight);
        mineCoords.push([x,y]);
    }
    return mineCoords;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}