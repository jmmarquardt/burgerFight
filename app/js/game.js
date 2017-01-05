var assets = require('./assetObj.js');
var Ronald = assets.Ronald;
var Sprites = assets.sprites;

exports.Game = {
	start: function() {
	    Crafty.init(this.width(), this.height(), document.getElementById("game"));
	    // Crafty.background('rgb(249, 223, 125)');
		// Crafty.background('rgb(142, 104, 4)');
		Crafty.background('url(/assets/img/sprites/ground-2.png)')
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

// game grid
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: exports.Game.map_grid.tile.width,
      h: exports.Game.map_grid.tile.height
    })
  },

  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return {
		  x: this.x/exports.Game.map_grid.tile.width,
		  y: this.y/exports.Game.map_grid.tile.height
	  }
    } else {
      this.attr({
		  x: x * exports.Game.map_grid.tile.width,
		  y: y * exports.Game.map_grid.tile.height
	  });
      return this;
    }
  }
});

// any 2D entity that is drawn to the canvas
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, DOM, Grid');
  }
});

// our bush sprites
Crafty.c('Bushes', {
  init: function() {
    this.requires('Actor, spr_bush, Solid')
  }
});

// trees for border
Crafty.c('Trees', {
  init: function() {
    this.requires('Actor, spr_tree, Solid');
  },
});

// player 1 object
Crafty.c('Player1', {
  init: function() {
    this.requires('Actor, Solid, Multiway, spr_ronald, Collision, SpriteAnimation')
      .bind('Moved', function(evt){
        if (this.hit('Solid'))
          this[evt.axis] = evt.oldValue;
      })
      .bind()
      .multiway(100,{
          W: -90, S: 90, D: 0, A: 180
	  })
	 // These next lines define our four animations
	 //  each call to .animate specifies:
	 //  - the name of the animation
	 //  - the array coordinates within the sprite
	 //  map at which the animation set
	 .reel('RonaldMovingUp', 600, Ronald.move.up)
	 .reel('RonaldMovingRight', 600, Ronald.move.right)
	 .reel('RonaldMovingDown', 600, Ronald.move.down)
	 .reel('RonaldMovingLeft', 600, Ronald.move.left);

	// Watch for a change of direction and switch animations accordingly
	var animation_speed = 8;
	this.bind('NewDirection', function(data) {
		 if (data.x > 0) {
		   this.animate('RonaldMovingRight', animation_speed, -1);
		 } else if (data.x < 0) {
		   this.animate('RonaldMovingLeft', animation_speed, -1);
		 } else if (data.y > 0) {
		   this.animate('RonaldMovingDown', animation_speed, -1);
		 } else if (data.y < 0) {
		   this.animate('RonaldMovingUp', animation_speed, -1);
		 } else {
		   this.pauseAnimation();
		 }
	});
	}

});

// player 2
Crafty.c('Player2', {
  init: function() {
    this.requires('Actor, Solid, Multiway, spr_king, Collision, SpriteAnimation')
      .bind('Moved', function(evt){
        if (this.hit('Solid'))
          this[evt.axis] = evt.oldValue;
      })
	  .bind()
      .multiway(100,{
      	UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
  }
});

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
	spr_tree: Sprites.spr_tree
});
