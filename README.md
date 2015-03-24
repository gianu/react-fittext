# React Fit text

This component is a port of the famous [fit text](http://fittextjs.com/) plugin for jQuery to use with React.

This component is 100% jQuery Free.

Homepage: [http://softwarepsychonaut.com/react-fittext](http://softwarepsychonaut.com/react-fittext)

## Usage

Simply wrap your text component inside <ReactFitText>

```javascript
// In your React component

var ReactFitText = require('react-fittext');
...

<ReactFitText>
  <h2>Testing React Fittext</h2>
</ReactFitText>
```

and you're good to go!

If you want to see a live demo of this component, you can [check the homepage](http://softwarepsychonaut.com/react-fittext).

### Parameters
 There are few options you can send to the component to modify it default behaviour:

 * __compressor__: you can tweak this variable to increase / decrease the font-size. Default is 1.
 * __minFontSize__: the minimun font size (in px) this component should use.
 * __maxFontSize__: the maximum font size (in px) this component should use.

## Issues / PR

 If you found any issue with this component, please [report it](https://github.com/gianu/react-fittext/issues).

 If you want to improve the code, feel free to create a PR!
 
## Thanks
* [KyleAMathews](https://github.com/KyleAMathews)
* [revolunet](https://github.com/revolunet)
* [poteto](https://github.com/poteto)
