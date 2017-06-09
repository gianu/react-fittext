/*
 * React FitText
 * https://github.com/gianu/react-fittext
 *
 * A port of the jQuery plugin: http://github.com/davatron5000/FitText.js
 *
 * Released under the MIT license
 * http://gianu.mit-license.org
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = require('prop-types');
var createClass = require('create-react-class');

module.exports = createClass({
  displayName: 'ReactFitText',

  propTypes: {
    children: ReactPropTypes.element.isRequired,
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

  componentDidUpdate: function() {
    this._onBodyResize();
  },

  _onBodyResize: function() {
    var element = ReactDOM.findDOMNode(this);
    var width = element.offsetWidth;
    element.style.fontSize = Math.max(
                      Math.min((width / (this.props.compressor*10)),
                                parseFloat(this.props.maxFontSize)),
                      parseFloat(this.props.minFontSize)) + 'px';
  },
  _renderChildren: function(){
    var _this = this;

    return React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { ref: function ref(c) {
        return _this._childRef = c;
      } });
    });
  },
  render: function() {
    return this._renderChildren()[0];
  }
});
