"use strict";
require("../styles/index.styl");

var React = require("react/addons");
var ReactFitTextBase = require("../../src");
var {ReactFitText} = ReactFitTextBase;

var Body = React.createClass({
  render: function() {
    return <div id="react-root">
      <ReactFitText>
        <h2>Testing React FitText</h2>
      </ReactFitText>
    </div>;
  }
});


React.render(<Body />, document.body);
