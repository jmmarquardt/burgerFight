var Game = require('./game.js'),
    assets = require('./assetObj.js'),
    drops = require('./drops.js'),
    tween = require('./tween.js'),
    Ronald = assets.Ronald,
    King = assets.King;

module.exports = {
  players: {
    p1 : {
      ammo: 10,
      powerCounter: 0,
      health: 3,
      powerUp: false
    },
    p2 : {
      ammo: 10,
      powerCounter: 0,
      health: 3,
      powerUp: false
    }
  },
  
  Grid : Crafty.c('Grid', {
    init: function() {
      this.attr({
        w: Game.Game.map_grid.tile.width,
        h: Game.Game.map_grid.tile.height
      })
    },

    at: function(x, y) {
      if (x === undefined && y === undefined) {
        return {
    		  x: this.x/Game.Game.map_grid.tile.width,
    		  y: this.y/Game.Game.map_grid.tile.height
    	  }
      } else {
        this.attr({
    		  x: x * Game.Game.map_grid.tile.width,
    		  y: y * Game.Game.map_grid.tile.height
    	  });
        return this;
      }
    }
  }),

  // any 2D entity that is drawn to the canvas
  Actor : Crafty.c('Actor', {
    init: function() {
      this.requires('2D, DOM, Grid');
    }
  }),

  // our bush sprites
  Bushes : Crafty.c('Bushes', {
    init: function() {
      this.requires('Actor, spr_bush, Solid')
    }
  }),

  // trees for border
  Trees : Crafty.c('Trees', {
    init: function() {
      this.requires('Actor, spr_tree, Solid');
    },
  }),

  Drop : Crafty.c('Drop', {
    init: function() {
      this.requires('Actor')
          .attr({
            w:15,
            h:15
          })
    }
  }),

  AmmoDrop : Crafty.c('AmmoDrop', {
    init: function() {
      this.requires('Drop, Color')
      .color("rgb(0, 0, 0)");
    }
  }),

  BigBurger : Crafty.c('BigBurger', {
    init: function() {
      this.requires('Drop, Color')
      .color("rgb(255,255,255)");
    }
  }),

  Health : Crafty.c('Health', {
    init: function() {
      this.requires('Drop, Color')
      .color("red");
    }
  }),

  // Player 1
  Player1 : Crafty.c('Player1', {
    init: function() {
      this.requires('Actor, Solid, Multiway, spr_ronald, Collision, SpriteAnimation')
      .bind('Moved', function(evt){
        if (this.hit('Solid')) {
          this[evt.axis] = evt.oldValue;
        }
      })
      .onHit('Actor', function(evt) {
        if (evt[0].obj._element.className.indexOf("Drop") !== -1) {
          Crafty.audio.play("powerUpSound");
          evt[0].obj.destroy();
          drops.getDropType(evt[0].obj, this, module.exports.players);
        }
      })
      .bind(
      "KeyDown",
      function(e) {
        if (e.key == Crafty.keys["F"] && (module.exports.players.p1.ammo > 0 || module.exports.players.p1.powerCounter > 0)) {
          var burgerX = tween.getTweenDirection(this)[1].x;
          var burgerY = tween.getTweenDirection(this)[1].y;
          // play throw sound
          Crafty.audio.play('throwSound');
          // burger sprite
          Crafty.e("Actor, spr_burger, Collision, Tween")
            .attr({
                x:burgerX,
                y:burgerY,
                w: drops.checkPowerUp(this, module.exports.players),
                h: drops.checkPowerUp(this, module.exports.players)
              })
            .onHit('Solid', function (evt) {
              if (evt[0].obj._element.className.indexOf("spr_ronald") === -1) {
                this.destroy();
                // play a splat when burger hits a solid
                Crafty.audio.play("splatSound");
              }

              if (evt[0].type === "SAT" && evt[0].obj._element.className.indexOf("spr_ronald") === -1) {
                module.exports.players.p2.health--;
                if (module.exports.players.p2.health <= 0) {
                  evt[0].obj.destroy();
                  
                  Crafty.scene("VictoryRonald");
                  module.exports.players.p1.ammo = 10;
                  module.exports.players.p1.health = 3;
                  module.exports.players.p1.powerUp = false;
                  module.exports.players.p1.powerCounter = 0;
                  module.exports.players.p2.ammo = 10;
                  module.exports.players.p2.health = 3;
                  module.exports.players.p2.powerUp = false;
                  module.exports.players.p2.powerCounter = 0;
                }
              }
            })
            .tween(tween.getTweenDirection(this)[0], 1500);

            if (module.exports.players.p1.powerUp) {
              if (module.exports.players.p1.powerCounter > 1) {
                module.exports.players.p1.powerCounter--;
              } else {
                module.exports.players.p1.powerUp = false;
                module.exports.players.p1.powerCounter--;
              }
            } else {
              module.exports.players.p1.ammo--;
            }
        }   
      })

      .multiway(100,{
          W: -90, S: 90, D: 0, A: 180
      })
     // These next lines define our animations
     //  each call to .animate specifies:
     //  - the name of the animation
     //  - the array coordinates within the sprite
     //  map at which the animation set
      .reel('RonaldWalkUp', 500, Ronald.walk.up)
      .reel('RonaldWalkRight', 500, Ronald.walk.right)
      .reel('RonaldWalkDown', 500, Ronald.walk.down)
      .reel('RonaldWalkLeft', 500, Ronald.walk.left)
      .reel('RonaldThrowUp', 500, Ronald.throw.up)
      .reel('RonaldThrowRight', 500, Ronald.throw.right)
      .reel('RonaldThrowDown', 500, Ronald.throw.down)
      .reel('RonaldThrowLeft', 500, Ronald.throw.left);

      // Watch for a change of direction and switch animations accordingly
      var animation_speed = 8;
      this.bind('NewDirection', function(data) {
         if (data.x > 0) {
           this.animate('RonaldWalkRight', animation_speed, -1);
         } else if (data.x < 0) {
           this.animate('RonaldWalkLeft', animation_speed, -1);
         } else if (data.y > 0) {
           this.animate('RonaldWalkDown', animation_speed, -1);
         } else if (data.y < 0) {
           this.animate('RonaldWalkUp', animation_speed, -1);
         } else {
           this.pauseAnimation();
         }
      });
    }
  }),

  // Player 2
  Player2 : Crafty.c('Player2', {
    init: function() {
      this.requires('Actor, Solid, Multiway, spr_king, Collision, SpriteAnimation')
      .bind('Moved', function (evt) {
        if (this.hit('Solid')) {
          this[evt.axis] = evt.oldValue;
        }
      })
      .onHit('Actor', function(evt) {
        if (evt[0].obj._element.className.indexOf("Drop") !== -1) {
          Crafty.audio.play("powerUpSound");
          evt[0].obj.destroy();
          drops.getDropType(evt[0].obj, this, module.exports.players);
        }
      })
      .bind(
        "KeyDown",
        function(e) {
          if (e.key == Crafty.keys["SPACE"] && (module.exports.players.p2.ammo > 0 || module.exports.players.p2.powerCounter > 0)) {
            var burgerX = tween.getTweenDirection(this)[1].x,
                burgerY = tween.getTweenDirection(this)[1].y;
            
            // play throw sound
            Crafty.audio.play('throwSound');
            // burger
            Crafty.e("Actor, spr_burger, Collision, Tween")
              .attr({
                  x: burgerX,
                  y: burgerY,
                  w: drops.checkPowerUp(this, module.exports.players),
                  h: drops.checkPowerUp(this, module.exports.players)
                })
              .onHit('Solid', function (evt) {
                if (evt[0].obj._element.className.indexOf("spr_king") === -1) {
                  this.destroy();
                  Crafty.audio.play("splatSound");
                }

                if (evt[0].type === "SAT" && evt[0].obj._element.className.indexOf("spr_king") === -1) {
                  module.exports.players.p1.health--;
                  if (module.exports.players.p1.health <= 0) {
                    evt[0].obj.destroy();
                    Crafty.scene("VictoryKing");
                    module.exports.players.p1.ammo = 10;
                    module.exports.players.p1.health = 3;
                    module.exports.players.p1.powerUp = false;
                    module.exports.players.p1.powerCounter = 0;
                    module.exports.players.p2.ammo = 10;                   
                    module.exports.players.p2.health = 3;
                    module.exports.players.p2.powerUp = false;
                    module.exports.players.p2.powerCounter = 0;
                  }
                }
              })
              .tween(tween.getTweenDirection(this)[0], 1500);
              
              if (module.exports.players.p2.powerUp) {
                if (module.exports.players.p2.powerCounter > 1) {
                  module.exports.players.p2.powerCounter--;
                } else {
                  module.exports.players.p2.powerUp = false;
                  module.exports.players.p2.powerCounter--;
                }
              } else {
                module.exports.players.p2.ammo--;
              }
          }
        }
      )
      .multiway(100,{
        UP_ARROW: -90,
        DOWN_ARROW: 90,
        RIGHT_ARROW: 0,
        LEFT_ARROW: 180
      })
      // These next lines define our animations
      //  each call to .animate specifies:
      //  - the name of the animation
      //  - the array coordinates within the sprite
      //  map at which the animation set
      .reel('KingWalkUp', 500, King.walk.up)
      .reel('KingWalkRight', 500, King.walk.right)
      .reel('KingWalkDown', 500, King.walk.down)
      .reel('KingWalkLeft', 500, King.walk.left)
      .reel('KingThrowUp', 500, King.throw.up)
      .reel('KingThrowRight', 500, King.throw.right)
      .reel('KingThrowDown', 500, King.throw.down)
      .reel('KingThrowLeft', 500, King.throw.left);

      // Watch for a change of direction and switch animations accordingly
      var animation_speed = 8;
      this.bind('NewDirection', function(data) {
        if (data.x > 0) {
          this.animate('KingWalkRight', animation_speed, -1);
        } else if (data.x < 0) {
          this.animate('KingWalkLeft', animation_speed, -1);
        } else if (data.y > 0) {
          this.animate('KingWalkDown', animation_speed, -1);
        } else if (data.y < 0) {
          this.animate('KingWalkUp', animation_speed, -1);
        } else {
          this.pauseAnimation();
        }
      });
    }
  })
}
