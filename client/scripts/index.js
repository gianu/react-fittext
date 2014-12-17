"use strict";
require("../styles/index.styl");

var React = require("react/addons");
var ReactFitTextBase = require("../../src");
var {ReactFitText} = ReactFitTextBase;

var Body = React.createClass({
  render: function() {
    return <div id="react-root">
      <ReactFitText>
        <h2>Probando React FitText con mucho mas texto del que creo que puede entrar, viendo a ver que joraca sale de todo esto...esperemos que se adapte</h2>
      </ReactFitText>
    </div>;
  }
});


React.render(<Body />, document.body);
