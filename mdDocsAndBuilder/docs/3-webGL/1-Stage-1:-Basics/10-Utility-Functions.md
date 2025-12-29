# Let's make some utility functions

In the last three chapters - **Coordinate Spaces**, **Graphics Primitives** and **Graphics Pipeline** we had a lot of theory and now its time to shift back to some code.

You must have noticed a few things in the chapters **Let's draw a point** and **Draw Multiple Points**:

- The code used to create and compile a **vertex shader** and a **fragment shader** is identical, except for the shader type constants - `gl.VERTEX_SHADER` and `gl.FRAGMENT_SHADER`. Can we make single, reusable function for this?

- As mentioned earlier, a WebGL application can use multiple **programs**, which means we must explicitly create, link, and select the program we want to use. Rather than repeating this setup code, can we encapsulate it into a function as well?

- A program can have multiple **attributes**, yet the buffer creation logic remains the same each time. Instead of rewriting this code repeatedly, can we create a utility function for setting up attribute buffers?


Well, we are going to reduce these pain points by creating a new file named `webgl-utilities.js` and importing it into our HTML files before `script.js` from now on.

**New HTML template**:

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="margin: 0">
    <canvas></canvas>
    <script src="../webgl-utilities.js"></script>
    <script src="./script.js"></script>
  </body>
</html>
```

I have imported the `webgl-utilities.js` with a `../` because I have kept it outside my working folder.


### Utility function to create and compile a shader

```js
function utilCreateShader(gl, shaderType, shaderSource) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader,shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (shaderType == gl.VERTEX_SHADER) {
      console.error("Error in vertex shader:");
    } else {
      console.error("Error in fragment shader:");
    }
    const error = gl.getShaderInfoLog(shader);
    console.error(error);
    throw error;
  }
  return shader;
}
```

Args of this function:

- **gl**: The WebGL context
- **shaderType**: The type of shader you want `gl.VERTEX_SHADER` or `gl.FRAGMENT_SHADER`.
- **shaderSource**: The shader program string.

**Function calling**

```js
const vertexShader = utilCreateShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = utilCreateShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
```


### Utility function to create and link a program

```js

function utilCreateProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    throw error;
  }
  return program;
}
```

Args of this function:

- **gl**: The WebGL context
- **vertexShader**: The vertex shader you got in return when you called `utilCreateShader` with `gl.VERTEX_SHADER` as the shaderType.
- **fragmentShader**: The fragment shader you got in return when you called `utilCreateShader` with `gl.FRAGMENT_SHADER` as the shaderType.

**Function calling**

```js
const program = utilCreateProgram(gl, vertexShader, fragmentShader);
```


### Utility function to create and set data in the buffer

```js
function utilCreateBuffer(gl,data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  return buffer;
}
```

Args of this function:

- **gl**: The WebGL rendering context.
- **data**: A JavaScript array containing the vertex data that will be uploaded to the GPU.

**Note: From now we will put any webgl utility function we make in the file `webgl-utilities.js`**

**Function calling**

```js
const pointsBuffer = utilCreateBuffer(gl,  pointsCoordinates);
```

### Sample program using these functions ( Draw Triangle ):
```js
//Step 1: Set the viewport
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl2");
canvas.height = window.innerHeight; // For making the canvas full screen
canvas.width = window.innerWidth; // For making the canvas full screen
gl.viewport(0, 0, canvas.width, canvas.height);

//Step 2: Write the shaders
// vertex shader
const vertexShaderSource = `#version 300 es
in vec2 a_position;
void main(){
  gl_Position = vec4(a_position,0,1);
  gl_PointSize = 30.0;
}`;

// fragment shader
const fragmentShaderSource = `#version 300 es
precision mediump float;
out vec4 color;
void main(){
  color = vec4(1,0,0,1); 
}`;

// Step 3: Compile the shaders
const vertexShader = utilCreateShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

const fragmentShader = utilCreateShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);

// Step 4: Create a WebGL program
const program = utilCreateProgram(gl, vertexShader, fragmentShader);

const pointsCoordinates = [
  0, 0.5, // First point
  -0.5, -0.5, // Second point
  0.5, -0.5, // Third point
];

const a_position_location = gl.getAttribLocation(program, "a_position");
// Create Buffer
const pointsBuffer = utilCreateBuffer( gl, pointsCoordinates);
gl.vertexAttribPointer(a_position_location, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(a_position_location)
// Step 7: Use the WebGL program
gl.useProgram(program);

// Step 8: Issue the draw call
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

<a href="https://github.com/Himanshu12102004/cg-docs-examples/blob/main/webgl-utilities.js" class="link" target="blank">Checkout the full webgl-utilities.js</a>
