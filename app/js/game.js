exports.Game = {
    
    start: function() {
	    Crafty.init(this.width(), this.height(), document.getElementById("game"));
	    Crafty.background('rgb(249, 223, 125)');

	    for (var x = 0; x < this.map_grid.width; x++) {
	      for (var y = 0; y < this.map_grid.height; y++) {
			var at_edge = x === 0 || x === this.map_grid.width - 1 || y === 0 || y === this.map_grid.height - 1;	 
	        if (at_edge) {
	          Crafty.e('2D, DOM, Color')
	            .attr({
	              x: x * this.map_grid.tile.width,
	              y: y * this.map_grid.tile.height,
	              w: this.map_grid.tile.width,
	              h: this.map_grid.tile.height
	            })
	            .color('rgb(20, 125, 40)');
	        } else if (Math.random() < 0.03) {
	          Crafty.e('2D, DOM, Color')
	            .attr({
	              x: x * this.map_grid.tile.width,
	              y: y * this.map_grid.tile.height,
	              w: this.map_grid.tile.width,
	              h: this.map_grid.tile.height
	            })
	            .color('rgb(20, 185, 40)');
	        }
	      }
    	}
	},
	"map_grid": {
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
  	}
};

