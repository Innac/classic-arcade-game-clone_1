//Game settings
var pointsCounter = 0;
var livesCounter = 5;
var gameWidth = 700;
var gameHeight = 400;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set hibox size
    this.height = 50;
    this.width = 50;
    //Enemy's position when the game starts
    this.x = Math.floor(Math.random() * 100) - 100;
    this.yPos = [60, 145, 225]; // three positions for bugs on stony road
    this.speed = Math.floor((Math.random() * 100) + 1) * 2; // random dt multiplier
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //if bug goes ofscreen - reset it's place on canvas
    if(this.x > 700){
        this.reset();
    }

    //if enemy collides with player
    if (this.x < player.x + player.width &&
        this.x + this.width > player.x &&
        this.y < player.y + player.height &&
        this.height + this.y > player.y) {
            player.reset();
            livesCounter--;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = this.yPos[Math.floor(Math.random() * this.yPos.length)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-princess-girl.png';
    //set hitbox size
    this.height = 50;
    this.width = 50;
    this.x = 0;
    this.y = 400;
    //Player speed vertically and horizontally
    this.xspeed = 101;
    this.yspeed = 83;
};

Player.prototype.update = function () {
    //if player reaches water
    if(this.y <=10){
        this.reset();
        pointsCounter = pointsCounter + 10;
    }

    // if player loses all it's lives
    if (livesCounter < 1){
        this.reset();
        livesCounter = 5;
        pointsCounter = 0;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //font settings
    ctx.font = '34px Arial';
    ctx.fillStyle= 'white';

    //Player points display
    var img = new Image();
    img.src = 'images/star.png';
    ctx.drawImage(img,20,32, 60, 102);
    ctx.fillText(pointsCounter, 120, 107);

    //Player lives display
    var img2 = new Image();
    img2.src = 'images/Heart.png';
    ctx.drawImage(img2,580,37, 60, 102);
    ctx.fillText(livesCounter, 673, 107);

};

//Player position when the game starts
Player.prototype.reset = function(){
    this.x = 0;
    this.y = 400;
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y = this.y - this.yspeed;
            break;
        case 'down':
            if (this.y < gameHeight) {
                this.y = this.y + this.yspeed;
            }
            break;
        case 'left':
            if (this.x > 0){
                this.x = this.x - this.xspeed;
            }
            break;
        case 'right':
            if (this.x < gameWidth - 100){  //Player should stay in game window
                this.x = this.x + this.xspeed;
            }
            break;
        default:
            //do nothing
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    enemy = new Enemy()
];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Adds new enemies every 1s

var i = 0;
function myLoop () {
   //  create a loop function
   setTimeout(function () {

     allEnemies.push( new Enemy() );
      i++;
      if (i < 5) {
         myLoop();
      }
   }, 1000);
}
myLoop();