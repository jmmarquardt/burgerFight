var React  = require("react");
    
var Gamescreen = React.createClass({

  componentDidMount: function() {
    console.log("component mounted");
  },

  componentDidUpdate: function() {
    console.log("component updated");
  },

  render: function() {
    return (
      <canvas></canvas>
    );
  }
});

module.exports = Gamescreen;