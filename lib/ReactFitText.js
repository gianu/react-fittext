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
    }
  },

  componentDidMount: function() {
    var width = this.refs.fitTextContainer.getDOMNode().offsetWidth;
    this.setState({width: width});
    // document.body.onresize = this._onBodyResize;
    window.addEventListener("resize", this._onBodyResize);
  },

  _onBodyResize: function() {
    var width = this.refs.fitTextContainer.getDOMNode().offsetWidth;
    this.setState({width: width});
  },

  render: function() {
    var divStyle = {
      'font-size': Math.max(Math.min((this.state.width / (this.props.compressor*10)), parseFloat(this.props.maxFontSize)), parseFloat(this.props.minFontSize))
    };

    return React.createElement("div", {ref: "fitTextContainer", style: divStyle}, 
              this.props.children
           );
  }
});
