var React  = require("react"),
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
      <div id="game"></div>
    );
  }
});

module.exports = Gamescreen;