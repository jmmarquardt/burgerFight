var React  = require("react"),
    PlayerCard = require("./PlayerCard"),
    gameLogic = require("./../js/game.js");

var Gamescreen = React.createClass({

  componentDidMount: function() {
    gameLogic.Game.start();
  },

  componentDidUpdate: function() {
    console.log("component updated");
  },

  render: function() {
    return (
      <div style={{display: "flex", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)"}}>
        <PlayerCard />
        <div id="game"></div>
        <PlayerCard />
      </div>
    );
  }
});

module.exports = Gamescreen;