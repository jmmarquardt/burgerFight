exports.Game = {

	
    
    start: function() {
	    Crafty.init(this.width(), this.height(), document.getElementById("game"));
	    Crafty.background('rgb(249, 223, 125)');

	    Crafty.e('PlayerCharacter').at(15, 5);

		for (var x = 0; x < this.map_grid.width; x++) {
	      for (var y = 0; y < this.map_grid.height; y++) {
			var at_edge = x === 0 || x === this.map_grid.width - 1 || y === 0 || y === this.map_grid.height - 1;	 
	        if (at_edge) {
	        	Crafty.e("Tree").at(x, y);  
	        } else if (Math.random() < 0.03) {
	            Crafty.e("Bush").at(x, y);
	        }
	      }
    	}
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
      .color('rgb(20, 185, 40)');
  }
});

Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Color, Solid');
    this.color('rgb(20, 125, 40)');
  },
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Solid, Color, Collision')
      .fourway(100)
      .color('rgb(20, 75, 40)')
      .bind('Moved', function(evt){
        if (this.hit('Solid'))
          this[evt.axis] = evt.oldValue;
      });
  }
});

