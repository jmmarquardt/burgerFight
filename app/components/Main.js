var React  = require("react"),
    Gamescreen = require("./Gamescreen"),
    PlayerCard = require("./PlayerCard");
    
var Main = React.createClass({

  componentDidMount: function() {
    console.log("component mounted");
  },

  componentDidUpdate: function() {
    console.log("component updated");
  },

  render: function() {
    return (
      <section>
        <section className="row">
          <PlayerCard />
          <section className="game-area">
            <Gamescreen />
          </section>
          <PlayerCard />
        </section>
      </section>
    );
  }
});

module.exports = Main;