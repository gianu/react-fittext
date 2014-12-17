"use strict";
var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
  displayName: 'ReactFitText',

  propTypes: {
    compressor: ReactPropTypes.number
  },

  getDefaultProps: function() {
    return {
      compressor: 1.0,
      minFontSize: Number.NEGATIVE_INFINITY,
      maxFontSize: Number.POSITIVE_INFINITY
    };
  },

  componentDidMount: function() {
    var width = this.refs.fitTextContainer.getDOMNode().offsetWidth;
    console.log(' --------- ');
    console.log(width);
    console.log(' --------- ');
  },

  render: function() {
    return React.createElement("div", {ref: "fitTextContainer", className: "myClass otherClass"}, 
      React.createElement("h1", null, " Otro componente "), 
      this.props.children
      );
  }
});
