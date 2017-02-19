exports.getTweenDirection = function (player) {
	
	var dir = player._direction,
		fromTop = {x:player.x + 14, y:player.y},
		fromBottom = {x:player.x + 14, y:player.y + 50};
	
		if(dir.x === 1 && dir.y === 1) { // down and right

			return [{x: player._x + 550, y: player._y + 550}, fromTop];
			
		} else if(dir.x === -1 && dir.y === 1) { // down and left

			return [{x: player._x - 550, y: player._y + 550}, fromTop];
			
		} else if(dir.y === 1 || player._currentReelId === "RonaldWalkDown" || player._currentReelId === "KingWalkDown") { // down
			
			return [{y: player._y + 550}, fromBottom];
		
		} else if(dir.x === -1 && dir.y === -1) { // up and left
			
			return [{x: player._x - 550, y: player._y - 550}, fromTop];
		
		} else if(dir.x === 1 && dir.y === -1) { // up and right

			return [{x: player._x + 550, y: player._y - 550}, fromTop];
		
		} else if(dir.y === -1 || player._currentReelId === "RonaldWalkUp" || player._currentReelId === "KingWalkUp") { // up
			
			return [{y: player._y - 550}, fromTop];
		
		} else if(dir.x === -1 || player._currentReelId === "RonaldWalkLeft" || player._currentReelId === "KingWalkLeft") { // left
			
			return [{x: player._x - 550}, fromTop];
		
		} else if(dir.x === 1 || player._currentReelId === "RonaldWalkRight" || player._currentReelId === "KingWalkRight") { // right
			
			return [{x: player._x + 550}, fromTop];
		
		} else { 

			return [{y: player._y + 550}, fromBottom];
		}
}