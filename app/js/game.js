exports.Game = {

	start: function() {
	    Crafty.init(this.width(), this.height(), document.getElementById("game"));
	    Crafty.background('rgb(249, 223, 125)');

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

Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: exports.Game.map_grid.tile.width,
      h: exports.Game.map_grid.tile.height
    })
  },

  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/exports.Game.map_grid.tile.width, y: this.y/exports.Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * exports.Game.map_grid.tile.width, y: y * exports.Game.map_grid.tile.height });
      return this;
    }
  }
});

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, DOM, Grid');
  }
});

Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Color, Solid')
      .color('rgb(20, 185, 40)')
  }
});

Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid');
    this.color('rgb(20, 125, 40)');
  },
});

Crafty.c('Player1', {
  init: function() {
    this.requires('Actor, Solid, Multiway, Ronald, Collision')
      .bind('Moved', function(evt){
        if (this.hit('Solid'))
          this[evt.axis] = evt.oldValue;
      })
      .bind()
      .multiway(100,{ 
          W: -90, S: 90, D: 0, A: 180});
  }
});

Crafty.c('Player2', {
  init: function() {
    this.requires('Actor, Solid, Multiway, Ronald, Collision, SpriteAnimation')
      .bind('Moved', function(evt){
        if (this.hit('Solid'))
          this[evt.axis] = evt.oldValue;
      })
      .multiway(100,{
      	UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
  }
});

Crafty.scene('Loading', function(){
  
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: exports.Game.height()/2 - 24, w: exports.Game.width()})
  	.css({"text-align": "center"})
  	.css({"font-size": "50px"});

  Crafty.sprite(3,"/assets/img/sprites/ronald.png", {Ronald:[0,0,8,13]});	
  
  Crafty.scene("Main");
});

Crafty.scene("Main", function () {
		Crafty.e('Player1').at(15, 5);
	    Crafty.e('Player2').at(5, 5);

		for (var x = 0; x < exports.Game.map_grid.width; x++) {
	      for (var y = 0; y < exports.Game.map_grid.height; y++) {
			var at_edge = x === 0 || x === exports.Game.map_grid.width - 1 || y === 0 || y === exports.Game.map_grid.height - 1;	 
	        if (at_edge) {
	        	Crafty.e("Tree").at(x, y);  
	        } else if (Math.random() < 0.03) {
	            Crafty.e("Bush").at(x, y);
	        }
	      }
    	}
});

