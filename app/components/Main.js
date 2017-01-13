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
          <section className="col-md-8 col-md-offset-1 game-area">
            <Gamescreen />
          </section>
        </section>
      </section>
    );
  }
});

module.exports = Main;