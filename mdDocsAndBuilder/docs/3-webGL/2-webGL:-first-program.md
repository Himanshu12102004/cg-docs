<!-- WebGL: First Program -->
<!--
This chapter introduces your first WebGL program.
It explains how to set up the HTML canvas, obtain a WebGL2 rendering context,
and use basic WebGL commands to clear the screen and paint the canvas red.
The goal is to build intuition about the canvas, contexts, buffers, and the
minimal steps required to render something using WebGL.
-->
<!--
webgl first program, webgl basics, canvas webgl, webgl tutorial beginner,
webgl clear color, color buffer, webgl2 context, gpu graphics browser,
CG introduction, webgl rendering basics
-->

# WebGL: First Program
The first program is going to be incredibly small and simple, we will just paint the canvas red.

## Setting Up the \<canvas\>
As discussed in the previous chapter, the `<canvas>` element is now widely available in most browsers. But what exactly is a canvas?

The `<canvas>` is an HTML tag that provides a **drawing area** on a web page. You can think of it like a **real canvas used for painting**. Just as you use pencils, brushes, or colors to draw on a physical canvas, we use JavaScript and WebGL as **digital tools** to draw pixels, shapes, and graphics on the HTML canvas.

Here is the HTML to use the canvas element:
``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="margin:5px">
    <canvas style="border: 1px solid red; height:100%; width:100%">
  </body>
</html>
```




<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765612943/dhsb2kafvylsoppmlysb.png" alt="canvas">
</div>
<i style="font-size:1rem; text-align:center">HTML page showing the canvas element</i>
</div>

## Getting Started with WebGL

To use WebGL we need Js so let's make a new file named `script.js` and import it into the html after the canvas element like this:
```html
<canvas style="border: 1px solid red">
<script src="./script.js"></script>
``` 

Let's see the steps that we would be taking further to paint the canvas red.

1. Get the canvas reference in Js.
2. Get the webgl context from the canvas.
3. Set the clear color.
4. Clear the color buffer.

These steps might be a bit overwhelming so let's see them one by one.

### 1. Get the canvas reference in Js
We use `document.querySelector` function to get the reference of the canvas element in javascript.
```javaScript
const canvas = document.querySelector("canvas");
``` 

### 2. Get the WebGL context
Just like you need a brush to paint on paper, you also need a **digital brush** to draw on a canvas. In our case, this digital brush is **WebGL**.

When you use a code editor like VS Code and type `canvas.getContext("")`, you will see a variety of available **brushes** to draw with. In CG, we refer to these brushes as **contexts**.


<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765615182/xzrj0myvt2cdqf5pgby5.png" alt="getContext">
</div>
<i style="font-size:1rem; text-align:center">Image showing the different context types available</i>
</div>

As this is a **WebGL** doc so we will not dwell much on the other contexts but for your information the **2d** context is used for only drawing the 2D CG and it uses CPU for rendering, **bitmaprenderer** must also be used for something I don't know : ), **webgl** context is the older version of webgl and the **webgl2** is the new version of webgl with enhanced speed and new functionality.

In these docs we would be using the **webgl2** rendering context.

```js
const gl = canvas.getContext("webgl2")
```

**Note: We can have only one context per canvas**

### 3. Set Clear Color

We have the canvas and our brush; now we need a color to paint with. To set the clear color, WebGL provides the function:

```js
gl.clearColor(1, 0, 0, 1)
```

You might be wondering what these four numbers mean. They represent the **RGBA** values, normalized to the range **0 to 1**. Here we are setting the color to red.
### 4. Clear the Color Buffer

To paint the canvas, WebGL provides the following function:

```js
gl.clear(gl.COLOR_BUFFER_BIT)
```

The function name `clear` might seem unintuitive at first. Taken literally, **to clear means to erase**. When WebGL clears the color buffer, it erases all previous pixel data and **fills the buffer with default values**.

In this case, the default value is the **clear color** that we set in the previous step using `gl.clearColor`. As a result, the entire canvas is filled with that color.

Now, what is the argument `gl.COLOR_BUFFER_BIT`?  
A buffer is a block of memory that has been allocated to store data, and WebGL has different kinds of buffers like:

- **color buffer** : Stores color information of each pixel
- **depth buffer** : As WebGl is a 3D rendering engine, hence we need a buffer to store depth of each pixel.
- **Stencil buffer**:Works like a stencil or mask. It controls **where drawing is allowed or blocked** on the canvas.
  Even if the GPU tries to draw everywhere, only the pixels that pass the stencil test are actually
  written to the canvas.

Now the argument `gl.COLOR_BUFFER_BIT` is a numeric constant that works like a flag and tells the clear function to clear the color bit with the color specified by the `gl.clearColor` function.

Similarly we have `gl.DEPTH_BUFFER_BIT` for referring to depth buffer and `gl.STENCIL_BUFFER_BIT` for stencil buffer.

Once you follow all the above steps you will see the following result:

<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765625281/qgl9sbaiqvsacc9q7j6h.png" alt="Final result">
</div>
<i style="font-size:1rem; text-align:center">Final result</i>
</div>

## Final Code
**index.html**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <canvas style="border: 1px solid red"></canvas>
    <script src="./script.js"></script>
  </body>
</html>
```
**script.js**
```js
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");
gl.clearColor(1, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
```

<a href="https://github.com/Himanshu12102004/cg-docs-examples/tree/main/2-PaintCanvasRed" class="link" target="blank">Checkout the full code on github</a>
