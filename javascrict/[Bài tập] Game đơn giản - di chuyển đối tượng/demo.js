const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "WHITE"; // color of an empty square


function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// drawSquare(0,0,"red");
// CREate the board
let board = [];
for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// draw the board.
function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();
// the pices and their colors
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];
// INIT a piece
let p = new Piece(PIECES[0][0], PIECES[0][1]);

// the objet piece

function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0 // start from the firts pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // need to control the piece
    this.x = 3;
    this.y = 0;
}

// fill function
Piece.prototype.fill = function (color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            // we
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// draw a piece to the borad
Piece.prototype.draw = function () {
    this.fill(this.color);
}
// p.draw();
// undraw a piece
Piece.prototype.unDraw = function () {
    this.fill(VACANT);
}
// move down the piece
Piece.prototype.moveDown = function () {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        //we
    }

}

// move right the piece
Piece.prototype.moveRight = function () {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }

}

// move left the piece
Piece.prototype.moveLeft = function () {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }

}
// move rotate the piece
Piece.prototype.Rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    if (!this.collision(0, 0, nextPattern)) {
        this.unDraw();
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }

}
//collision fuction
Piece.prototype.collision = function (x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece.length; c++) {
            // we
            if (!piece[r][c]) {
                continue;
            }
            //coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            //conditions
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            //skip newY < 0; board[-1] will our game
            if (newY < 0) {
                continue;
            }
            // check if there is a locked
            if (board[newY][newX] !== VACANT) {
                return true;
            }
        }
    }
    return false;
};
// CONTROL THE PIECE
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode == 38) {
        p.Rotate();
        dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight();
        dropStart = Date.now();
    } else if (event.keyCode == 40) {
        p.moveDown();
    }
}

// drop the piece every lsec
let dropStart = Date.now();

function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {         //1000ms = 1s
        p.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

drop();
