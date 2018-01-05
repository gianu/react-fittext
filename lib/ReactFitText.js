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

// Map from node to options
const nodes = new Map();

function updateElementStyle(element, options, width) {
  element.style.fontSize = `${Math.min(Math.max(width / (options.compressor * 10), options.minFontSize), options.maxFontSize)}px`;
}

let updateQueued = false;

function onBodyResize() {
  updateQueued = true;
  const widths = [];
  nodes.forEach((options, element) => {
    widths.push(element.offsetWidth);
  });
  let i = 0;
  nodes.forEach((options, element) => {
    updateElementStyle(element, options, widths[i]);
    i += 1;
  });
}

window.addEventListener("resize", onBodyResize);
window.addEventListener("load", onBodyResize);

module.exports = createClass({
  displayName: 'ReactFitText',

  propTypes: {
    children: ReactPropTypes.element.isRequired,
    compressor: ReactPropTypes.number,
    minFontSize: ReactPropTypes.number,
    maxFontSize: ReactPropTypes.number,
  },

  getDefaultProps: function() {
    return {
      compressor: 1.0,
      minFontSize: Number.NEGATIVE_INFINITY,
      maxFontSize: Number.POSITIVE_INFINITY
    };
  },

  componentWillMount: function() {
    if (!updateQueued) {
      window.requestAnimationFrame(onBodyResize);
    }
  },

  componentWillUnmount: function() {
    if (this._childRef) {
      nodes.delete(this._childRef);
    }
  },

  componentDidUpdate: function() {
    onBodyResize();
  },

  _renderChildren: function(){
    var _this = this;

    return React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { ref: function ref(c) {
        if (c) {
          nodes.set(c, _this.props);
        }
        _this._childRef = c;
      } });
    });
  },
  render: function() {
    return this._renderChildren()[0];
  }
});
