var assets = require('./assetObj.js'),
	components = require('./crafty.components.js'),
	Ronald = assets.Ronald,
	King = assets.King,
	Sprites = assets.sprites,
	sfx = assets.audio,
	Actor = components.Actor,
	Bushes = components.Bushes,
	Trees = components.Trees,
	Grid = components.Grid,
	Player1 = components.Player1,
	Player2 = components.Player2,
	dropInterval,
	gameMusicLoop;

// ============================================================================

exports.Game = {
  start: function() {
        Crafty.init(this.width(), this.height(), document.getElementById("game"));
		Crafty.background('url(/assets/img/sprites/ground-1.png)')
	 	Crafty.scene("Loading");
  },
  map_grid: {
    width:  Math.round((window.innerWidth / 16) / 1.75),
    height: Math.round((window.innerHeight / 16) - 2),
    tile: {
      width:  16,
      height: 16
    }
  },
  width: function() {
	  return this.map_grid.width * this.map_grid.tile.width;
  },
  height: function() {
  	  return this.map_grid.height * this.map_grid.tile.height;
  }
};


// "loading" scene-loads initial game grid
Crafty.scene('Loading', function(){

  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: exports.Game.height()/2 - 24, w: exports.Game.width()})
  	.css({"text-align": "center"})
  	.css({"font-size": "50px"});

  // Game Audio loaded and declared
	Crafty.audio.add({
		// effects
		throwSound: sfx.throw,
		splatSound: sfx.splat,
		dropSound: sfx.drop,
		powerUpSound: sfx.powerUp,
		// music
		backgroundMusic: sfx.music,
		// voices
		ronaldLaugh: sfx.laugh,
		hitSound: sfx.hit,
		finishHim: sfx.finishHim,
		round1: sfx.round1,
		fight: sfx.fight,
		gameOver: sfx.gameOver
	});

	// static game sprites loaded and declared
  Crafty.sprite(1,"/assets/img/sprites/spritesheet.png", {
		// players static sprites
    spr_ronald: Sprites.spr_ronald,
		spr_king: Sprites.spr_king,
		// background sprites
		spr_bush: Sprites.spr_bush,
		spr_tree: Sprites.spr_tree,
		spr_ground: Sprites.spr_ground,
		// throws
		spr_burger: Sprites.spr_burger,
		// drops
		spr_heart: Sprites.spr_heart,
		spr_happyMeal: Sprites.spr_happyMeal,
		spr_bigBurger: Sprites.spr_bigBurger
  });

  // load scene "main"
  Crafty.scene("Main");
});

Crafty.scene("Main", function () {
	
	var occupied = new Array(exports.Game.map_grid.width);
	Crafty.audio.play('fight');
	Crafty.audio.play('backgroundMusic', -1);

	for (var i = 0; i < exports.Game.map_grid.width; i++) {

    	occupied[i] = new Array(exports.Game.map_grid.height);

    	for (var j = 0; j < exports.Game.map_grid.height; j++) {
      		occupied[i][j] = false;
  		}
	}

	// Spawn player 1
	this.player1 = Crafty.e('Player1').at(5, 5);
	// Spawn player 2
	this.player2 = Crafty.e('Player2').at((exports.Game.map_grid.width - 5), (exports.Game.map_grid.height - 5));
	occupied[this.player2.at().x][this.player2.at().y] = true;

	for (var x = 4; x <= 7; x++) {
		for (var y = 4; y<=7; y++) {
			occupied[x][y] = true;
		}
	}
	for (var x = exports.Game.map_grid.width - 7; x < exports.Game.map_grid.width; x++) {
		for (var y = exports.Game.map_grid.height - 7; y < exports.Game.map_grid.height; y++) {
			occupied[x][y] = true;
		}
	}

	for (var x = 0; x < exports.Game.map_grid.width; x++) {
	    
	    for (var y = 0; y < exports.Game.map_grid.height; y++) {

		var at_edge = x === 0 || x === exports.Game.map_grid.width - 1 || y === 0 || y === exports.Game.map_grid.height - 1;

	      if (at_edge) {
	      	Crafty.e("Trees").at(x, y);
	      	occupied[x][y] = true;
	      } else if (Math.random() < .05 && !occupied[x][y]) {
	      		Crafty.e("Bushes").at(x, y);
	      		occupied[x][y] = true;
	      	}
	    }
	}
	
	dropInterval = setInterval(function() {
		var randomX = Math.round(Math.random() * (exports.Game.map_grid.width / 3) + (exports.Game.map_grid.width / 3));
		var randomY = Math.round(Math.random() * (exports.Game.map_grid.height / 3) + (exports.Game.map_grid.height / 3));

		if (!occupied[randomX][randomY]) {
			if (Math.random() <= .2) {
				Crafty.e("AmmoDrop").at(randomX,randomY);
			} else if (Math.random() > .2 && Math.random() <= .6) {
				Crafty.e("BigBurger").at(randomX, randomY);
			} else if (Math.random() > .6) {
				Crafty.e("Health").at(randomX, randomY);
			}
			Crafty.audio.play("dropSound");
		}
	},15000);
});

// VICTORY SCENES
Crafty.scene('VictoryRonald', function() {
  clearInterval(dropInterval);
  clearInterval(gameMusicLoop);
  Crafty.audio.stop();
  Crafty.audio.play("ronaldLaugh");
  // Crafty.background('url(http://i49.tinypic.com/egd83n.jpg)');
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Main');
  });
}, function() {
	 	this.unbind('KeyDown', this.restart_game);
});

Crafty.scene('VictoryKing', function() {
  clearInterval(dropInterval);
  clearInterval(gameMusicLoop);
  Crafty.audio.stop();
  // Crafty.background('url(http://i49.tinypic.com/egd83n.jpg)');
  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Main');
  });
}, function() {
	 	this.unbind('KeyDown', this.restart_game);
});
