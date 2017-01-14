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
          <section className="col-md-2"></section>
          <section className="col-md-8 game-area">
            <Gamescreen />
          </section>
          <section className="col-md-2"></section>
        </section>
      </section>
    );
  }
});

module.exports = Main;