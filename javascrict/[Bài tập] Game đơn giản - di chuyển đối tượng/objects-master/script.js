
function Hero(image, top, left, size) {
    this.image = image;
    this.top = top; 
    this.speed = 20;
    this.left = left;
    this.size = size;

    this.getHeroElement = function () {
        return '<img id="char" width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;" />';
    };
    
    this.moveRight = function () {

        this.left += this.speed;
        console.log("phai"+this.left);
    };
    this.moveDown = function () {

        this.top += this.speed;
         console.log("xuong"+this.top);

    };
    this.moveLeft = function () {

        this.left -= this.speed;
        console.log("trai"+this.left);

    };
    this.moveUp = function () {

        this.top -= this.speed;
        console.log("len"+this.top);
    };
    

}

let hero = new Hero('pikachu.png', 20, 30, 200);

function start() {

    if (hero.left < window.innerWidth - hero.size && hero.top === 0) {
        hero.moveRight();
    } else if (hero.top < window.innerHeight - hero.size && hero.left > window.innerWidth - hero.size)
        hero.moveDown();
    else if (hero.left > 0 && hero.top > window.innerHeight - hero.size) {
        hero.moveLeft();
    } else if (hero.top > 0) {
        hero.moveUp();
    }
    document.getElementById('game').innerHTML = hero.getHeroElement();
    setTimeout(start, 50)
}
start();