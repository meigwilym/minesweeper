// helper.js

export function makeBoard(maxWidth, maxHeight, mineTotal) {
    const mineCoords = createMines(maxWidth, maxHeight, mineTotal);
    return mineCoords;
}

export function createMines(maxWidth, maxHeight, mineTotal) {
    const mineCoords = {};
    for (let i = 0; i < mineTotal; i++) {
        let x = getRandomInt(maxWidth);
        let y = getRandomInt(maxHeight);

        if (typeof mineCoords[x] == 'undefined') {
            mineCoords[x] = [];
        }

        if (!mineCoords[x].includes(y)) {
            mineCoords[x].push(y);
        } else {
            i--;
        }
    }

    return mineCoords;
}

// returns all neighbours of a tile
export function getNeighbours(tiles, x, y) {
    const neighbours = [];
    for (const xA of [-1, 0, 1]) {
        for (const yA of [-1, 0, 1]) {
            if (xA === 0 && yA === 0) {
                continue;
            }
            if (tiles.hasOwnProperty(x + xA) && tiles[x + xA].hasOwnProperty(y + yA)) {
                neighbours.push(tiles[x + xA][y + yA]);
            }
        }
    }
    return neighbours;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}