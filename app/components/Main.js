var React  = require("react"),
    Gamescreen = require("./Gamescreen");

var Main = React.createClass({

  componentDidMount: function() {
    console.log("component mounted");
  },

  componentDidUpdate: function() {
    console.log("component updated");
  },

  render: function() {
    return (
      <section className="container">
        <section className="row">
          <section ></section>
          <section className="game-area">
            <Gamescreen />
          </section>
          <section ></section>
        </section>
      </section>
    );
  }
});

module.exports = Main;
