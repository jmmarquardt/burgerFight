// sprite sheet arrays--private variables to this file.
// When sprite sheet changes, just update the below frame numbers from
// spritesheet.json
var spritesheet = require('../../public/assets/img/sprites/spritesheet.json'),
  bushSprite = spritesheet.frames[2],
  ronaldSprite = spritesheet.frames[3],
  kingSprite = spritesheet.frames[4],
  burgerSprite = spritesheet.frames[0],
  treeSprite = spritesheet.frames[3],
  groundSprite = spritesheet.frames[1];
// ============================================================================
// exporting assetObj
module.exports = {
  Ronald: {
  	walk: {
  		up: [
  			[32, 1726], [0, 1764], [32, 1764], [0, 1802],
  			[32, 1802], [0, 1840], [32, 1840], [0, 1878],
  			[32, 1878], [0, 1916], [32, 1916], [0, 1954],
  			[32, 1954]
  		],
  		down: [
  			[32, 890], [0, 928], [32, 928], [0, 966],
  			[32, 966], [0, 1004], [32, 1004], [0, 1042],
  			[32, 1042], [0, 1080], [32, 1080], [0, 1118]
  		],
  		right: [
  			[32, 1460], [0, 1498], [32, 1498], [0, 1536],
  			[32, 1536], [0, 1574], [32, 1574], [0, 1612]
  		],
  		left: [
  			[0, 1232], [32, 1232], [0, 1270], [32, 1270],
  			[0, 1308], [32, 1308], [0, 1346], [32, 1346]
  		]
  	},
    throw: {
      up: [
        [32, 1612], [0, 1650], [32, 1650], [0, 1688],
        [32, 1688], [0, 1726]
      ],
      down: [
        [0, 776], [32, 776], [0, 814], [32, 814],
        [0, 852], [32, 852], [0, 890]
      ],
      left: [
        [32, 1118], [0, 1156], [32, 1156], [0, 1194],
        [32, 1194],
      ],
      right: [
        [0, 1384], [32, 1384], [0, 1422], [32, 1422],
        [0, 1460]
      ]
    }
  },
  // the burger King
  King: {
  	walk: {
  		up: [
  			[0, 548], [32, 548], [0, 586], [32, 586],
        [0, 624], [32, 624], [0, 662], [32, 662],
        [0, 700], [32, 700], [0, 738], [32, 738]
  		],
  		down: [
  			[0, 16], [32, 16], [0, 54], [32, 54],
        [0, 92], [32, 92], [0, 130], [32, 130],
        [0, 168], [32, 168], [0, 206], [32,206]

  		],
  		right: [
  			[0, 396], [32, 396], [0, 434], [32, 434],
        [0, 472], [32, 472], [0, 510], [32, 510]
  		],
  		left: [
  			[0, 244], [32, 244], [0, 282], [32, 282],
  			[0, 320], [32, 320], [0, 358], [32, 358]
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
      spr_ronald: [32, 890, 32, 38],
      spr_king: [kingSprite.frame.x, kingSprite.frame.y, kingSprite.frame.w, kingSprite.frame.h],
      spr_bush: [bushSprite.frame.x, bushSprite.frame.y, bushSprite.frame.w, bushSprite.frame.h],
  	  spr_tree: [treeSprite.frame.x, treeSprite.frame.y, treeSprite.frame.w, treeSprite.frame.h],
      spr_ground: [groundSprite.frame.x, groundSprite.frame.y, groundSprite.frame.w, groundSprite.frame.h],
      spr_burger: [burgerSprite.frame.x, burgerSprite.frame.y, burgerSprite.frame.w, burgerSprite.frame.h]
  }
};
