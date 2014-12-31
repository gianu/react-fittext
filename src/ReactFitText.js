/*
 * React FitText v0.0.3
 * https://github.com/gianu/react-fittext
 *
 * A port of the jQuery plugin: http://github.com/davatron5000/FitText.js
 *
 * Copyright 2014, Sergio Rafael Gianazza http://softwarepsychonaut.com
 *
 * Released under the MIT license
 * http://gianu.mit-license.org
 */
'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
  displayName: 'ReactFitText',

  propTypes: {
    compressor: ReactPropTypes.number,
    minFontSize: ReactPropTypes.number,
    maxFontSize: ReactPropTypes.number
  },

  getDefaultProps: function() {
    return {
      compressor: 1.0,
      minFontSize: Number.NEGATIVE_INFINITY,
      maxFontSize: Number.POSITIVE_INFINITY
    };
  },

  componentDidMount: function() {
    window.addEventListener("resize", this._onBodyResize);
    this._onBodyResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this._onBodyResize);
  },

  _onBodyResize: function() {
    var element = this.getDOMNode();
    var width = element.offsetWidth;
    var fontSize = Math.max(Math.min((width / (this.props.compressor*10)), parseFloat(this.props.maxFontSize)), parseFloat(this.props.minFontSize)) + 'px';
    element.style.fontSize = fontSize;
  },

  render: function() {
    return this.props.children;
  }
});
