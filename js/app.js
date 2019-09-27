
let yIndex = [50, 135, 220]; //array containing the y-positions of the enemies.

class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.x = -100; //off screen
        this.y = yIndex[Math.floor((Math.random() * 3))]; //random number picker between 50, 135, 220.
        this.speed = Math.floor(Math.random() * (400 - 200 + 1) + 200); //random number between 400 and 200 source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    }

    update(dt) {
        this.x += this.speed * dt; //updates the enemy x-position by taking the speed and multiplying it with dt.
    
        if(this.x > 500){ //if the enemy is off-screen.
            this.x = -100; //reset the enemy x-position
            this.y = yIndex[Math.floor((Math.random() * 3))]; //give the enemy a random y-position.
            this.speed = Math.floor(Math.random() * (400 - 200 + 1) + 200); //give the enemy a random speed.
        }

        //check collision.
        if(this.y - player.y === 10) { //if the player and the enemy are in the same row.
            if((this.x > player.x - 50) && (this.x < player.x + 50)) { //if the player and the enemy are in the same column. (if if the enemy is near the player by "50" from the right and left)
                player.x = 200; //reset the player location.
                player.y = 380;
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200; //starting location for the player
        this.y = 380; 
    }

    update() {
        //no need for this method?  
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e) {
        if(e === 'left' && this.x !== 0) { //if the player pressed left and he is not in the most left column.
            this.x -= 100;
        }
        else if(e === 'right' && this.x !== 400) { //if the player pressed right and he is not in the most right column.
            this.x += 100;
        }
        else if(e === 'up') { //if the player pressed up
            this.y -= 85;
            if(this.y < 40){ // check if the player reached the water.
                this.x = 200; //reset the player location.
                this.y = 380;
                alert("Congratulations, You Won!"); //alert the player that they won :)
            }
        }
        else if(e === 'down' && this.y !== 380) { //if the player pressed down and he is not in the most bottom row.
            this.y += 85;
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy()]; //i created 3 enemies to start with.
var player = new Player(); //new player object.

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
