"use strict";
class Characters {
    constructor() {
        this.x;
        this.y;
        this.sprite = 'images/'
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Enemies our player must avoid
class Enemy extends Characters {
    constructor(x, y, sprite) {
        super();
        this.x = -1;
        this.y = 35;
        this.sprite += 'enemy-bug.png';
        this.speed = 250;
    }

//checks to see where the player is in relation to the bugs and detects collision
    update(dt) {
        this.x = Math.floor(this.x + this.speed * dt);
        if (this.x === -1) {
            this.x = ((Math.random() * 550) + 15);
            Math.floor(this.x); 
        }
        if (this.x >= 550) {
            this.x = 2;
        }
        if (this.y == 35) {
            this.y = this.y + (Math.floor(Math.random() * 190)) + 12;
        }
        if (this.y === -1 && this.y <= 400 && player.y === 60 || player.y === 220 || player.y === 140) {
            if (this.x >= player.x - 50 && this.x <= player.x + 50) {
                alert('stop');
                player.reset();
            }
        }
    }
    
    render() {
        super.render();
    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player extends Characters {
    constructor(x, y, sprite) {
        super();
        this.reset();
        this.sprite += 'char-boy.png';
    }

    //this starts and resets the players position each play
    reset() {
        this.x = 200;
        this.y = 380;
    }

//this makes sure the player doesn't move off the board, also resets when the player gets to the water
    update(dt) {
        if (this.y <= -10) {
            location.reload();
        } else if (this.y >= 381) {
            this.y = 380;
        } else if(this.x <= -90) {
            this.x = 0;
        } else if(this.x >= 500) {
            this.x = 400;
        }
    }

    render() {
        super.render();
    }

//this allows the player to move around the board
    handleInput(keyup) {
        if (keyup === 'left') {
            this.x -= 100;
        } else if (keyup == 'right') {
            this.x += 100;
        } else if (keyup == 'up') {
            this.y -= 80;
        } else if (keyup == 'down') {
            this.y += 80;
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
]

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
