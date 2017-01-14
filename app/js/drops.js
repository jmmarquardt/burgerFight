var components = require('./crafty.components');
	

exports.getDropType = function (evtObj, player, playersObj) {
	
	if (evtObj._element.className.indexOf("AmmoDrop") !== -1) {
		if (player._element.className.indexOf("spr_ronald") !== -1) {
			playersObj.p1.ammo += 5;
		} else if (player._element.className.indexOf("spr_king") !== -1) {
			playersObj.p2.ammo += 5;
		}
	} else if (evtObj._element.className.indexOf("BigBurger") !== -1) {
		if (player._element.className.indexOf("spr_ronald") !== -1) {
			playersObj.p1.powerUp = true;
			playersObj.p1.powerCounter += 5;
		} else if (player._element.className.indexOf("spr_king") !== -1) {
			playersObj.p2.powerUp = true;
			playersObj.p2.powerCounter += 5;
		}
	} else if (evtObj._element.className.indexOf("Health") !== -1) {
		if (player._element.className.indexOf("spr_ronald") !== -1) {
			playersObj.p1.health = 3;
			console.log(playersObj.p1.health);
		} else if (player._element.className.indexOf("spr_king") !== -1) {
			playersObj.p2.health = 3;
		}
	}
}

exports.checkPowerUp = function (player, playersObj) {
	if (player._element.className.indexOf("spr_ronald") !== -1) {
		if (playersObj.p1.powerUp) {
			return 30;
	    } else {
	    	return 10;
	    }
	} else if (player._element.className.indexOf("spr_king") !== -1) {
		if (playersObj.p2.powerUp) {
			return 30;
		} else {
			return 10;
		}
	}	
}