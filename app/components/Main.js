var React  = require("react"),
    Gamescreen = require("./Gamescreen"),
    Comments = require("./Comments");
    

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
          <section className="col-md-2"></section>
          <section className="col-md-8 game-area">
            <Comments />
          </section>
        </section>
      </section>

    );
  }
});

module.exports = Main;
