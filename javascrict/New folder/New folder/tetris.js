var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "WHITE"; // mau sac hinh vuong trống.
// //draw a square(vẻ hình vuông)



function drawSquare(x,y,color){
	ctx.fillStyle = color;
	ctx.fillRect(x*SQ,y*SQ,SQ,SQ);
	ctx.strokeStyle = "black";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}
//CREate the board(TAOJ bảng)
// drawSquare(0,0,"red");
let board = [];
for ( r =0; r < ROW ; r++){
	board[r] = [];
	for(c = 0 ; c < COL; c++ ){
		board[r][c] = VACANT;
	}
}
// DRAW THE board(ve bang)
function drawBoard(){
	for( r = 0; r< ROW; r++){
		for(c = 0; c < COL; c++){
			drawSquare(c,r,board[r][c]);
		}
	}
}
drawBoard();
//the pieces and their color(manh va mau sac)
const PIECES = [
	[Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"]
	
];
// random piece(ngau nhien nhieu manh)
function randomPiece(){
	let r = randomN = Math.floor(Math.random() * PIECES.length )// 0->6
	return new Piece(PIECES[r][0],PIECES[r][1]);
}
// initate a piece( khoi tao 1 manh)
// let p = new Piece(PIECES[0][0],PIECES[0][1]);
let p  = randomPiece();

//doi tuong
function Piece(tetromino, color){
	this.tetromino = tetromino;
	this.color = color;

	this.tetrominoN = 0 // we start from the first pattern(bat dau tu mau dau tien)
	this.activeTetromino = this.tetromino[this.tetrominoN];

	//we need to control the pieces( Điều khiển các ô vuông)

	this.x = 3;
	this.y = 0;
}
// fill function(chức năng điền)
Piece.prototype.fill = function(color){
	for( r = 0; r< this.activeTetromino.length; r++){
		for(c = 0; c < this.activeTetromino.length; c++){
			// we draw only occupied squares
			if(this.activeTetromino[r][c]){
				drawSquare(this.x + c, this.y + r,color);
			}
			
		}
	}
}
// draw a piece to the board(vẽ một mảnh lên bảng)

Piece.prototype.draw = function(){
	this.fill(this.color);
}
// p.draw();
//undraw a piece( xoa bo phan chan manh),
Piece.prototype.unDraw = function(){
	this.fill(VACANT);
}
// move Down the piece( di chuyen manh XUONG duoi)
Piece.prototype.moveDown = function(){
	if(!this.collision(0,1,this.activeTetromino)){
		this.unDraw();
	    this.y++;
	    this.draw();
	} else{
		// we lock the piece and generate a new one(khóa mảnh và tạo ra một cái mới)

		p = random.Piece();
	}
}
// MOVE right the piece
Piece.prototype.moveRight = function(){
	if(!this.collision(1,0,this.activeTetromino)){
		this.unDraw();
		this.x++;
		this.draw();
	}
}
// MOVE left the piece
Piece.prototype.moveLeft = function(){
	if(!this.collision(-1,0,this.activeTetromino)){
		this.unDraw();
		this.x--;
		this.draw();
	}
}
// rotate the piece
Piece.prototype.Rotate = function(){
	let nextPattern = this.tetromino[(this.tetrominoN + 1)% this.tetromino.length];
	let kick = 0;
	if(this.collision(0,0,nextPattern)){
		if( this.x > COL/2){
			//its the right wall
			kick = -1 ; // we need to move the piece to the left
		} else {
			// it's the left wall
			kick = 1 ; // we need to move the piece to the right
		}
	}
	if(!this.collision(kick,0,nextPattern)){
		this.unDraw();
		this.x += kick;
		this.tetrominoN = (this.tetrominoN+1)%this.tetromino.length;//(0+1)%4 =>1
		this.activeTetromino = this.tetromino[this.tetrominoN];
		this.draw();
	}
	
}
// collision function(chức năng va chạm)
Piece.prototype.collision = function(x,y,piece){
		for( r = 0; r< piece.length; r++){
		for(c = 0; c < piece.length; c++){
			// if the square is empty, we skip it(nếu hình vuông trống, chúng ta bỏ qua nó)
			if(!piece[r][c]){
				continue;
			}
			// coordinates of the piece after movement(tọa độ moi của mảnh sau khi chuyển động)
			let newX = this.x + c +x;
			let newY = this.y + r +y;
			// conditions(điều kiện)
			if(newX < 0 || newX >= COL || newY > ROW  ){
				return true;
			}
			// skip newY < 0; board[-1] will crush our game
			if(newY < 0 ){
				continue;
			}
			// check if there is a locked piece alrady in place(kiểm tra nếu có một mảnh khóa bị khóa tại chỗ)
			if( board[newY][newX] != VACANT){
				return true;
			}
		}
	}
	return false;
}
// control the piece
document.addEventListener("keydown",CONTROL);
function CONTROL(event){
	if(event.keyCode == 37){
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
// drop the piece every lsec( thả trôi mảnh)
let dropStart = Date.now();
function drop(){
	let now = Date.now();
	let delta = now- dropStart;
	if(delta > 1000){
		p.moveDown();
		dropStart = Date.now();
	}
	
	requestAnimationFrame(drop);
}
drop();



