var React  = require("react");
    
var Main = React.createClass({

  getInitialState: function() {
    return {
      width: (window.innerWidth - (Math.round((window.innerWidth / 16) / 1.75))) / 5
    };
  },

  componentDidMount: function() {
    console.log("component mounted");
    console.log((window.innerWidth - (Math.round((window.innerWidth / 16) / 1.75)))/ 2);
    var p_card = document.getElementsByClassName("player-card");
    console.log(p_card);
    var width = (window.innerWidth - (Math.round((window.innerWidth / 16) / 1.75)))/ 2;
  },

  componentDidUpdate: function() {
    console.log("component updated");
  },

  render: function() {
    return (
      
        <section className="player-card" style={{width: this.state.width, backgroundColor: 'gray', borderWidth: 2}} >
          
        </section>
      
    );
  }
});

module.exports = Main;