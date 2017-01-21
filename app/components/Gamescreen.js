var React       = require("react"),
    PlayerCard  = require("./PlayerCard"),
    gameLogic   = require("./../js/game.js"),
    players     = require("./../js/crafty.components.js");

var Gamescreen  = React.createClass({

  getInitialState: function() {
    return {
      ronaldInfo: players.players.p1,
      kingInfo: {

      }
    };
  },

  componentDidMount: function() {
    gameLogic.Game.start();
    console.log("ronald info mounted: ", this.state.ronaldInfo);
  },

  componentDidUpdate: function() {
    console.log("ronald update in react: ", this.state.ronaldInfo);
  },

  render: function() {
    return (
      <div style={{display: "flex", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}>
        
        <div id="game"></div>
        
      </div>
    );
  }
});

module.exports = Gamescreen;
