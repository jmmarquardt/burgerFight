exports.getTweenDirection = function (player) {

	var dir = player._activeDirections,
		fromTop = {x:player.x + 14, y:player.y},
		fromBottom = {x:player.x + 14, y:player.y + 50};
	
		if(dir[0] === 1 && dir[90] === 1) { // down and right

			return [{x: player._x + 550, y: player._y + 550}, fromTop];
			
		} else if(dir[90] === 1 && dir[180] === 1) { // down and left

			return [{x: player._x - 550, y: player._y + 550}, fromTop];
			
		} else if(dir[90] === 1) { // down
			
			return [{y: player._y + 550}, fromBottom];
		
		} else if(dir[180] === 1 && dir[-90] === 1) { // up and left
			
			return [{x: player._x - 550, y: player._y - 550}, fromTop];
		
		} else if(dir[0] === 1 && dir[-90] === 1) { // up and right

			return [{x: player._x + 550, y: player._y - 550}, fromTop];
		
		} else if(dir[-90] === 1) { // up
			
			return [{y: player._y - 550}, fromTop];
		
		} else if(dir[180] === 1) { // left
			
			return [{x: player._x - 550}, fromTop];
		
		} else if(dir[0] === 1) { // right
			
			return [{x: player._x + 550}, fromTop];
		
		} else { // default
			
			return [{y: player._y + 550}, fromTop];
		}
}