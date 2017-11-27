# Animate Plus

Animate Plus is a JavaScript animation library focusing on performance and authoring flexibility. It
aims to deliver a steady 60 FPS and weighs less than 2 KB (minified and gzipped), making it
particularly well-suited for mobile.

## Getting started

`npm install animateplus` or download `animateplus.js` and start animating things:

```javascript
import animate from "/animateplus.js";

animate({
  elements: "div",
  duration: 2000,
  delay: index => index * 100,
  transform: ["scale(0)", "scale(1)"]
})
.then(options => animate({
  ...options,
  transform: ["translate(0%)", "translate(500%)"]
}));
```

[Preview this example →](http://animateplus.com/examples/getting-started/)

## Options

### elements

| Default | Type
| :---    | :---
| `null`  | String \| Element \| NodeList \| Array

Determines the DOM elements to animate. You can either pass it a CSS selector or DOM elements.

```javascript
animate({
  elements: document.body.children,
  transform: ["rotate(0turn)", "rotate(1turn)"]
});
```

### easing

| Default       | Type
| :---          | :---
| `out-elastic` | String

Determines the acceleration curve of your animation.

| constant | accelerate     | decelerate      | accelerate-decelerate
| :---     | :---           | :---            | :---
| linear   | in-cubic       | out-cubic       | in-out-cubic
|          | in-quartic     | out-quartic     | in-out-quartic
|          | in-quintic     | out-quintic     | in-out-quintic
|          | in-exponential | out-exponential | in-out-exponential
|          | in-circular    | out-circular    | in-out-circular
|          | in-elastic     | out-elastic     | in-out-elastic

The amplitude and period of elastic easings can be configured by providing space-separated values.
Amplitude defaults to `1`, period to `0.4`.

```javascript
// Increase elasticity
animate({
  elements: "span",
  easing: "out-elastic 1.4 0.2",
  transform: ["translate(0px)", "translate(500px)"]
});
```

### duration

| Default | Type
| :---    | :---
| `1000`  | Number \| Function

Determines the duration of your animation in milliseconds. By passing it a callback, you can define
a different duration for each element. The callback takes the index of each element as its argument
and returns a number.

```javascript
// First element fades out in 1s, second element in 2s, etc.
animate({
  elements: "span",
  easing: "linear",
  duration: index => (index + 1) * 1000,
  opacity: [1, 0]
});
```

### delay

| Default | Type
| :---    | :---
| `0`     | Number \| Function

Determines the delay of your animation in milliseconds. By passing it a callback, you can define
a different delay for each element. The callback takes the index of each element as its argument
and returns a number.

```javascript
// First element fades out after 1s, second element after 2s, etc.
animate({
  elements: "span",
  easing: "linear",
  delay: index => (index + 1) * 1000,
  opacity: [1, 0]
});
```

### loop

| Default | Type
| :---    | :---
| `false` | Boolean

Determines if the animation should repeat.

### direction

| Default  | Type
| :---     | :---
| `normal` | String

Determines the direction of the animation. `reverse` runs the animation backwards, `alternate`
switches direction after each iteration if the animation loops.

### speed

| Default | Type
| :---    | :---
| `1`     | Number

Determines the animation playback rate. Useful in the authoring process to speed up some parts of a
long sequence (value above 1) or slow down a specific animation to observe it (value below 1).

### optimize

| Default | Type
| :---    | :---
| `false` | Boolean

Forces hardware acceleration during an animation if set to `true`. Unless you experience performance
issues, it's recommended to leave it off as hardware acceleration comes with potentially harmful
side-effects.

### change

| Default | Type
| :---    | :---
| `null`  | Function

Defines a callback invoked on every frame of the animation. The callback takes as its argument the
animation progress (between 0 and 1) and can be used on its own without being tied to `elements`.

```javascript
// Linearly outputs the percentage increase during 5s
animate({
  duration: 5000,
  easing: "linear",
  change: progress =>
    document.body.textContent = `${Math.round(progress * 100)}%`
});
```

## Animations

Animate Plus lets you animate HTML and SVG elements with any property that takes numeric values,
including hexadecimal colors.

```javascript
// Animate the radius and fill color of an SVG circle
animate({
  elements: "circle",
  r: [0, 50],
  fill: ["#80f", "#fc0"]
});
```

Each property you animate needs an array defining the start and end values. For convenience, you can
omit everything but the numbers in the end values.

```javascript
// Same as ["translate(0px)", "translate(100px)"]
animate({
  elements: "span",
  transform: ["translate(0px)", 100]
});
```

These arrays can optionally be returned by a callback that takes the index of each element, just
like with [duration](#duration) and [delay](#delay).

```javascript
// First element translates by 100px, second element by 200px, etc.
animate({
  elements: "span",
  transform: index => ["translate(0px)", (index + 1) * 100]
});
```

## Promise

`animate()` returns a promise which resolves once the animation finishes. The promise resolves to
the object initially passed to `animate()`, making animation chaining straightforward and
convenient. The [Getting started](#getting-started) section gives you a basic promise example.

Since Animate Plus relies on native promises, you can benefit from all the usual features promises
provide, such as `Promise.all`, `Promise.race`, and especially `async/await` which makes animation
timelines easy to set up.

```javascript
const play = async () => {
  const options = await animate({
    elements: "span",
    duration: 3000,
    transform: ["translateY(-100vh)", 0]
  });

  await animate({
    ...options,
    transform: ["rotate(0turn)", 1]
  });

  await animate({
    ...options,
    duration: 800,
    easing: "in-quintic",
    transform: ["scale(1)", 0]
  });
};

play();
```

[Preview this example →](http://animateplus.com/examples/timeline/)

## Additional functions

### stop

Stops the animations on the [elements](#elements) passed as the argument.

```javascript
import {stop} from "/animateplus.js";

animate({
  elements: "span",
  easing: "linear",
  duration: index => 8000 + index * 200,
  loop: true,
  transform: ["rotate(0deg)", 360]
});

document.addEventListener("click", ({target}) => stop(target));
```

[Preview this example →](http://animateplus.com/examples/stop/)

### delay

Sets a timer in milliseconds. It differentiates from `setTimeout()` by returning a promise and being
more accurate, consistent and battery-friendly. The [delay](#delay) option relies internally on
this method.

```javascript
import {delay} from "/animateplus.js";

delay(500).then(time => console.log(`${time}ms elapsed`));
```

## Browser support

Animate Plus is provided as a native ES2015 module, which means you may need to transpile it
depending on your browser support policy. The library works as is using `<script type=module>` in
the following browsers:

* Chrome 61
* Safari 11.1
* Firefox 57 with `dom.moduleScripts.enabled`

## Best practices

Animations play a major role in the design of good user interfaces. They help connecting actions to
consequences, make the flow of interactions manifest, and greatly improve the polish and perception
of a product. However, animations can be damaging and detrimental to the user experience if they get
in the way. Here are a few best practices to keep your animations effective and enjoyable:

* **Speed**: Keep your animations fast. A quick animation makes a software feel more productive and
  responsive. The optimal duration depends on the effect and animation curve, but in most cases you
should likely stay under 500 milliseconds.
* **Easing**: The animation curve contributes greatly to a well-crafted animation. The ease-out
  options are usually a safe bet as animations kick off promptly, making them react to user
interactions instantaneously.
* **Performance**: Having no animation is better than animations that stutter. When animating HTML
  elements, aim for using exclusively `transform` and `opacity` as these are the only properties
browsers can animate cheaply.
* **Restraint**: Tone down your animations and respect user preferences. Animations can rapidly feel
  overwhelming and cause motion sickness, so it's important to keep them subtle and to attenuate
them even more for users who need reduced motion, for example by using `matchMedia("(prefers-reduced-motion)")` in JavaScript.

## Examples

* [Stress test](http://animateplus.com/examples/stress-test/): 500 elements animated concurrently.
* [Morphing](http://animateplus.com/examples/clip-path/): CSS polygon morphing using `clip-path`.
* [Motion path](http://animateplus.com/examples/motion-path/): Animation along a custom path.
* [Line drawing](http://animateplus.com/examples/line-drawing/): SVG line drawing animation.
* [Elasticity](http://animateplus.com/examples/elasticity/): SVG circles following your clicks.
* [Anchors](http://animateplus.com/examples/anchor-scroll/): Anchor scrolling animation using `change()`.
* [Progress](http://animateplus.com/examples/progress/): Animation progress using `change()`.
* [Text](http://animateplus.com/examples/text/): Text splitting animation.
