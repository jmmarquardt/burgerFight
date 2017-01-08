var assets = require('./assetObj.js'),
	components = require('./crafty.components.js'),
	Ronald = assets.Ronald,
	King = assets.King,
	Sprites = assets.sprites,
	Actor = components.Actor,
	Bushes = components.Bushes,
	Trees = components.Trees,
	Grid = components.Grid,
	Player1 = components.Player1,
	Player2 = components.Player2;

// ============================================================================

exports.Game = {
	start: function() {
    Crafty.init(this.width(), this.height(), document.getElementById("game"));
		Crafty.background('url(/assets/img/sprites/ground-1.png)')
	 	Crafty.scene("Loading");
  },
  map_grid: {
    width:  38,
    height: 38,
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
	},
};



// "loading" scene-loads initial game grid
Crafty.scene('Loading', function(){

  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: exports.Game.height()/2 - 24, w: exports.Game.width()})
  	.css({"text-align": "center"})
  	.css({"font-size": "50px"});
	// add game audio assets later RIGHT HERE
	// Crafty.audio.add(['']);
// });

  // load scene "main"
  Crafty.scene("Main");
});

// "Main" Scene loads players
Crafty.scene("Main", function () {
		Crafty.e('Player1').at(5, 5);
    	Crafty.e('Player2').at(15, 5);

		for (var x = 0; x < exports.Game.map_grid.width; x++) {
	      for (var y = 0; y < exports.Game.map_grid.height; y++) {
			var at_edge = x === 0 || x === exports.Game.map_grid.width - 1 || y === 0 || y === exports.Game.map_grid.height - 1;

	        if (at_edge) {
	        	Crafty.e("Trees").at(x, y);
	        } else if (Math.random() < 0.03) {
	          Crafty.e("Bushes").at(x, y);
	        }
	      }
	  	}
});

// Sprites declared
Crafty.sprite(1,"/assets/img/sprites/spritesheet.png", {
	spr_ronald: Sprites.spr_ronald,
	spr_king: Sprites.spr_king,
	spr_bush: Sprites.spr_bush,
	spr_tree: Sprites.spr_tree,
	spr_ground: Sprites.spr_ground,
	spr_burger: Sprites.spr_burger
});
