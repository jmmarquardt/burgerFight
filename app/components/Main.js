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
        <section className="jumbotron">
          <h1 className="text-center">Burger Fight</h1>
        </section>
        <section className="row">
          <section className="col-md-2">
            <h1>TEST</h1>
            <div className="playerCard">
            </div>
          </section>
          <section className="col-md-8 game-area">
            <Gamescreen />
          </section>
          <section className="col-md-2">
            <h1>TEST</h1>
            <div className="playerCard">
            </div>
          </section>
        </section>
      </section>
    );
  }
});

module.exports = Main;