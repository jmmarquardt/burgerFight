// sprite sheet arrays
var spritesheet = require('../../public/assets/img/sprites/spritesheet.json'),
  frame = spritesheet.frames,
  bushSprite = spritesheet.frames[2],
  ronaldSprite = spritesheet.frames[3],
  kingSprite = spritesheet.frames[2],
  treeSprite = spritesheet.frames[-1];

module.exports = {
  Ronald: {
  	move: {
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
  },
  // the burger King
  King: {

  },
  // our static sprites
  sprites: {
      // ronaldSprite: frame[3],
      // x: frame['x'],
      // y: frame.y,
      // w: frame.w,
      // h: frame.h,
  	  // spr_ronald: [frame[3].x, frame[3].y, frame[3].w, frame[3].h],
  	  // spr_king: [frame[1].x, frame[1].y, frame[1].w, frame[1].h],
  	  // spr_bush: [frame[2].x, frame[2].y, frame[2].w, frame[2].h],
      spr_ronald: [0,38,32,38],
      spr_king: [12,0,32,38],
      // spr_bush: [48,0,16,16],
      spr_bush: [bushes.frame.x, bushes.frame.y, bushes.frame.w, bushes.frame.h],
  	  spr_tree: [0, 1254, 16, 16]
  }
};

// module.exports = Ronald;
