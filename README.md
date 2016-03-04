# Animate Plus

Animate Plus is a CSS and SVG animation library for modern browsers. Animate Plus is performant and
lightweight (2.8KB gzipped), making it particularly well-suited for mobile.

* [Performance/stress test](http://animateplus.com/demos/bloom/): hold the mouse down and make DOM elements bloom!
* [Real-world example](https://stripe.com/open-source): all the CSS and SVG animations on this page are made with Animate Plus.

## Getting Started

`npm install animateplus` or download and insert `animate.min.js`:

```html
<script src=animate.min.js></script>
```
Start animating things:

```javascript
animate({
  el: "div",
  translateX: 100,
  opacity: 0,
  duration: 500
});
```

## API

### Arguments

`animate` accepts either an `Object` or a `Map` containing at least an element and a property to animate:

```javascript
animate({
  el: "div",
  opacity: 0
});

// Or:
var params = new Map();
params.set("el", "div");
params.set("opacity", 0);
animate(params);
```

### el

The elements to animate. `el` can take any of these types:

| Type           | Example
| -------------- | ----------------------------------------------
| CSS selector   | `"div"`
| jQuery object  | `$("div")`
| DOM element    | `document.querySelector("div")`
| NodeList       | `document.querySelectorAll("div")`
| HTMLCollection | `document.getElementsByTagName("div")`
| Array          | `[document.querySelector("div")]`
| Set            | `new Set().add(document.querySelector("div"))`

### duration

The duration of your animation in milliseconds. Default: `1000`.

### delay

The delay before your animation starts in milliseconds. Default: `0`.

### easing

The easing type. Default: `easeOutElastic`. You can preview the possible values listed
below with the [easing visualizer tool](http://animateplus.com/easing-visualizer/).

| linear | ease in       | ease out       | ease in out
| ------ | ------------- | -------------- | ----------------
| linear | easeInQuad    | easeOutQuad    | easeInOutQuad
|        | easeInCubic   | easeOutCubic   | easeInOutCubic
|        | easeInQuart   | easeOutQuart   | easeInOutQuart
|        | easeInQuint   | easeOutQuint   | easeInOutQuint
|        | easeInSine    | easeOutSine    | easeInOutSine
|        | easeInExpo    | easeOutExpo    | easeInOutExpo
|        | easeInCirc    | easeOutCirc    | easeInOutCirc
|        | easeInElastic | easeOutElastic | easeInOutElastic
|        | easeInBack    | easeOutBack    | easeInOutBack
|        |               | easeOutBounce  |

The frequency of elastic curves can be configured by passing a number between 0 and 1000 (default: `500`).

```javascript
animate({
  el: "div",
  translateY: "200%",
  easing: "easeOutElastic 700"
});
```

### loop

Boolean. Specifies if your animation should run indefinitely. Default: `false`.

### direction

The direction of your animation. Default: `normal`. Possible values:

* normal
* reverse
* alternate (only applies if your animation loops)

### begin

A function to trigger before your animation starts. An array of the elements selected with the `el` parameter is passed as the callback's first argument.

```html
<!doctype html>
<title>Example</title>

<style>
  div {
    display: none;
    width: 100px;
    height: 100px;
    background: black;
   }
</style>

<div></div>
<div></div>

<script src=animate.min.js></script>
<script>
  animate({
    el: "div",
    scaleX: 2,
    begin: show
  });

  function show(elements) {
    elements.forEach(function(el) { el.style.display = "block"; });
  }
</script>
```

### complete

Same as `begin`, but triggers the callback at the end of the animation instead.

## CSS animations

Supported properties:

* translateX - translateY - translateZ
* scale - scaleX - scaleY - scaleZ
* rotate - rotateX - rotateY - rotateZ
* skewX - skewY
* opacity
* perspective

Animations start from default CSS values and end to the values you specify:

```javascript
animate({
  el: "div",
  opacity: 0,    // fades out from 1 to 0
  translateX: 20 // slides to the right by 20px
});
```
Alternatively, you can specify custom start values by passing an array:

```javascript
animate({
  el: "div",
  opacity: [0, 1],    // fades in from 0 to 1
  translateX: [20, 0] // slides to the left from 20px to 0
});
```

`animate` automatically adds units if they're missing (`deg` for `rotate`, `px` for `translate` and `perspective`) but you can specify them if needed:

```javascript
animate({
  el: "div",
  translateX: "100%"
});
```

## SVG animations

SVG animations require an array with your start and end values. Any SVG attribute containing at
least some numeric values can be animated:

```javascript
var colors = ["#80f", "#fc0"];

var points = [
  "M54,271 L0,271 L0,103 L0,0 L142,0 L285,0 L285,103 L285,271 L230,271 L142,271 Z",
  "M54,271 L71,172 L0,103 L98,89 L142,0 L186,89 L285,103 L213,172 L230,271 L142,224 Z"
];

animate({
  el: "path",
  fill: colors,
  d: points
});
```
[View this example's result →](http://animateplus.com/demos/star/)

## Stopping animations

`animate.stop(el)` stops all animations running on `el` (which can be any of [these values](#el)).

```javascript
var div = document.querySelector("div");

animate({
  el: div,
  rotate: 180
});

// Stop the rotation on click
div.addEventListener("click", function() {
  animate.stop(div);
});
```

## Quick examples

* [Line-drawing animation screencast](https://cloudup.com/cNfHp2Pbeyk)
* [Parallax icon](http://animateplus.com/demos/parallax/)
* [SVG morphing button 1](http://animateplus.com/demos/search/)
* [SVG morphing button 2](http://animateplus.com/demos/download-button/)
* [250 SVG circles](http://animateplus.com/demos/particles/) (mouseover the elements)
* [Bouncing circle of DOM elements](http://animateplus.com/demos/circle/) (mouseover the elements)
* [Bendy paths](http://animateplus.com/demos/bendy-path/) based on the `<use>` SVG element.
