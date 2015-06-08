# Animate Plus

Animate Plus is a performant JavaScript library that helps you animate CSS properties and SVG
attributes. Animate Plus is well-suited for quick UI interactions as well as longer animation
sequences on both desktop and mobile. Check out these simple examples:

* [CSS spring animations on DOM elements](http://animateplus.com/demos/circle/)
* [Simple SVG morphing animation](http://animateplus.com/demos/download-button/)
* [Performance/stress test](http://animateplus.com/demos/particles/) (250 SVG shapes animated independently)

## Getting Started

Download and insert `animate.min.js` (2.7KB gzipped) :

```html
<script src=animate.min.js></script>
```
Start animating things:

```javascript
animate({
  el: "div",
  translateX: 100,
  opacity: .5,
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

The elements to animate. `el` can either take a:

* CSS selector: `"div"`
* jQuery-like object: `$("div")`
* DOM element: `document.querySelector("div")`
* Array of DOM elements: `[document.querySelector("div")]`
* NodeList or HTMLCollection: `document.getElementsByTagName("div")`

### duration

The duration of your animation in milliseconds. Default: `1000`.

### delay

The delay before your animation starts in milliseconds. Default: `0`.

### easing

The easing type. Default: `easeOutElastic`. You can preview the possible values listed
below with the [easing visualizer tool](http://animateplus.com/easing-visualizer/).

* linear
* easeInQuad
* easeInCubic
* easeInQuart
* easeInQuint
* easeInSine
* easeInExpo
* easeInCirc
* easeInElastic
* easeInBack
* easeOutQuad
* easeOutCubic
* easeOutQuart
* easeOutQuint
* easeOutSine
* easeOutExpo
* easeOutCirc
* easeOutElastic
* easeOutBack
* easeOutBounce
* easeInOutQuad
* easeInOutCubic
* easeInOutQuart
* easeInOutQuint
* easeInOutSine
* easeInOutExpo
* easeInOutCirc
* easeInOutElastic
* easeInOutBack

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

* opacity
* translateX
* translateY
* translateZ
* scaleX
* scaleY
* scaleZ
* rotateX
* rotateY
* rotateZ
* skewX
* skewY
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

SVG animations require an array with your start and end values. Any SVG attribute accepting numerical values can be animated:

```javascript
var colors = ["#0bf", "#fc0"];
var points = ["96 180 37 180 0 180 0 69 0 0 96 0 191 0 191 69 191 180 154 180",
              "95 147 36 180 50 114 0 69 67 61 95 0 122 61 190 69 139 114 153 180"];

animate({
  el: "polygon",
  easing: "easeOutCubic",
  translateX: 200,
  fill: colors,
  points: points
});
```
[View this example's result →](http://animateplus.com/demos/star/)
