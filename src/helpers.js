// helper.js

export function makeBoard(maxWidth, maxHeight, mineTotal) {
    const mineCoords = createMines(maxWidth, maxHeight, mineTotal);
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

const timeString = 'time.';

export function getTime(level) {
    return localStorage.getItem(timeString+level);
}

export function setTime(level, time) {
    localStorage.setItem(timeString+level, time);
}

export function isFastestTime(level, time) {
    return getTime(level) < time;
}

export function emptyTile(i, j) {
    return {
        x: i,
        y: j,
        mine: false, 
        nearbyMines: 0,
        isRevealed: false,
        hasFlag: false
    };
}

export function createTiles(width, height) {
    const tiles = [];

    for (let i = 0; i < width; i++) {
        const row = [];
        for (let j = 0; j < height; j++) {
            row.push(emptyTile(i, j));
        }
        tiles.push(row);
    }
    return tiles;
}

export function createMines(tiles, mineTotal) {
    let plantedMines = 0;
    while (plantedMines < mineTotal) {
        let x = getRandomInt(tiles[0].length);
        let y = getRandomInt(tiles.length);

        if (tiles[x][y].mine === false) {
            tiles[x][y].mine = true;
            plantedMines++;
        }
    }
    return tiles;
}

export function checkNeighbours(tiles) {
    // check for mines, and count
    for (let i = 0; i < tiles[0].length; i++) {
        for (let j = 0; j < tiles.length; j++) {
            if (!tiles[i][j].mine) {
                const neighbours = getNeighbours(tiles, i, j);
                for (const neighbourTile of neighbours) {
                    if (neighbourTile.mine) {
                        tiles[i][j].nearbyMines = tiles[i][j].nearbyMines + 1;
                    }
                }
            }
        }
    }
    return tiles;
}

export function createBoard(width, height, mines) {
    const tiles = createTiles(width, height);
    const boardMines = createMines(tiles, mines);
    const boardMinesNeighbours = checkNeighbours(boardMines);

    return boardMinesNeighbours;
}

export function getElementXY(target) {
    let { x , y } = target.dataset;
    x = parseInt(x);
    y = parseInt(y);
    return { x, y };
}