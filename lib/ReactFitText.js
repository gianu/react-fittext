'use strict';

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

  getInitialState: function() {
    return {
      width: 920
    };
  },

  componentDidMount: function() {
    var width = this.getDOMNode().offsetWidth;
    this.setState({
      width: width
    });
    window.addEventListener("resize", this._onBodyResize);
  },

  _onBodyResize: function() {
    var width = this.getDOMNode().offsetWidth;
    this.setState({
      width: width
    });
  },

  render: function() {
    var divStyle = {
      'fontSize': Math.max(
        Math.min(
          (this.state.width / (this.props.compressor * 10)),
          parseFloat(this.props.maxFontSize)),
        parseFloat(this.props.minFontSize)
      )
    };

    // Incorporate passed in styles.
    divStyle = React.__spread(this.props.style, divStyle);

    return React.createElement(
      "div",
      React.__spread(this.props, {
        ref: "fitTextContainer",
        style: divStyle
      }),
      this.props.children
    );
  }
});
