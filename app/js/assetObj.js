// sprite sheet arrays--private variables to this file.
// When sprite sheet changes, just update the below frame numbers from
// spritesheet.json
var spritesheet = require('../../public/assets/img/sprites/spritesheet.json'),
  bushSprite = spritesheet.frames[2],
  ronaldSprite = spritesheet.frames[3],
  kingSprite = spritesheet.frames[1],
  treeSprite = spritesheet.frames[67],
  groundSprite = spritesheet.frames[0];
// ============================================================================
// exporting assetObj
module.exports = {
  Ronald: {
  	walk: {
  		up: [
  			[32, 988], [0, 1026], [32,1026], [0,1064],
  			[32, 1064], [0,1102], [32, 1102], [0,1140],
  			[32,1140], [0,1178], [32,1178], [0,1216],
  			[32,1216]
  		],
  		down: [
  			[32,152], [0,190], [32,190], [0,228],
  			[32,228], [0,266], [32,266], [0,304],
  			[32,304], [0,342], [32,342], [0,380]
  		],
  		right: [
  			[32, 722], [0,760], [32,760], [0,798],
  			[32,798], [0,836], [32,836], [0,874]
  		],
  		left: [
  			[0, 494], [32,494], [0,532], [32,532],
  			[0,570], [32,570], [0,608], [32,608]
  		]
  	},
    throw: {
      up: [],
      down: [],
      left: [],
      right: []
    }
  },
  // the burger King
  King: {
  	walk: {
  		up: [
  			[32, 988], [0, 1026], [32,1026], [0,1064],
  			[32, 1064], [0,1102], [32, 1102], [0,1140],
  			[32,1140], [0,1178], [32,1178], [0,1216],
  			[32,1216]
  		],
  		down: [
  			[32,152], [0,190], [32,190], [0,228],
  			[32,228], [0,266], [32,266], [0,304],
  			[32,304], [0,342], [32,342], [0,380]
  		],
  		right: [
  			[32, 722], [0,760], [32,760], [0,798],
  			[32,798], [0,836], [32,836], [0,874]
  		],
  		left: [
  			[0, 494], [32,494], [0,532], [32,532],
  			[0,570], [32,570], [0,608], [32,608]
  		]
  	},
    throw: {
      up: [],
      down: [],
      left: [],
      right: []
    }
  },
  // our static sprites
  sprites: {
      spr_ronald: [ronaldSprite.frame.x, ronaldSprite.frame.y, ronaldSprite.frame.w, ronaldSprite.frame.h],
      spr_king: [kingSprite.frame.x, kingSprite.frame.y, kingSprite.frame.w, kingSprite.frame.h],
      // spr_bush: [48,0,16,16],
      spr_bush: [bushSprite.frame.x, bushSprite.frame.y, bushSprite.frame.w, bushSprite.frame.h],
  	  spr_tree: [treeSprite.frame.x, treeSprite.frame.y, treeSprite.frame.w, treeSprite.frame.h],
      spr_ground: [groundSprite.frame.x, groundSprite.frame.y, groundSprite.frame.w, groundSprite.frame.h]
  }
};
