# Let's draw multiple points
In the last program you must have noticed that we hardcoded the position to `vec4(0,0,0,1)` in the vertex shader, but now you want multiple points at different places, so we need to give the vertex shader an input telling that draw the first point here then there etc. These vertex shader inputs are called attributes.

## What are attributes
Any input given to the vertex shader can be termed as attribute, and here we will use attribute to pass the position of points.

Let's see how to use them

```js
// vertex shader
const vertexShaderSource = `#version 300 es
in vec2 a_position;
void main(){
  gl_Position = vec4(a_position,0,1);
  gl_PointSize = 30.0;
}`;
```
You notice that we have added a new line `in vec2 a_position;` in the shader, and this line helps us to take the input into the shader.  The name of the attribute `a_position` has a `a_` in the prefix is just to maintain the convention, and here `a_` stands for attribute.

You might get confused with this line `gl_Position = vec4(a_position,0,1);` that how come a `vec4` constructor take a `vec2` as its first arg and the then the other args are 0 and 1, let me clarify this it's actually a shorthand form of writing `vec4(a_position[0], a_position[1], 0, 1)` and GLSL has tons of these shorthands that we will discuss in further chapters.  

Now the question arises how to give different positions to this attribute for different points

## Steps to give input to the vertex shader

1. Make a js array of the coordinates of points  
2. Get the location of the attribute
3. Create Buffer
4. Bind Buffer to the target
5. Insert data into the buffer
6. Tell the GPU how to read the buffer
7. Enable the attribute
8. Issue the draw call with the number of vertices you want to draw.

Now let's see each step in detail:

### 1. Make a js array of the coordinates of points
First of all you need to define an array containing the coordinates of all the points you want to be drawn on the screen.

Code:
``` js
const pointsCoordinates = [
  0.0, 0.5, // First point
  -0.5,-0.5, // Second point
  0.5,-0.5, // Third point
];
```
### 2. Get the location of the attribute

The next step is to get the **location of an attribute** in the vertex shader.  
But what does *location* actually mean?

When you write a vertex shader with multiple attributes:

```glsl
in vec3 a_position;
in vec3 a_color;
in vec3 a_normal;
```
The attribute names (`a_position`, `a_color`, `a_normal`) are only for readability.
Inside the GPU, attributes are not identified by their names, but by numeric
values called attribute locations.

During program linking, WebGL assigns a number (such as `0`, `1`, `2`, …) to each
attribute.

There is one more question, why we need the location in the first place?

From the example above you can see that there can be more than one attributes or inputs in the vertex shader and hence to identify a particular attribute and pass data to that attribute. 

To get the location of the attribute we invoke the function `gl.getAttribLocation` with the first arg being `program` and the next arg is the name of the attribute.

Code:
```js
const a_position_location = gl.getAttribLocation(program, "a_position");
```

### 3. Create Buffer
The first question that arises is: **what is a buffer?**

A **buffer** in WebGL is a block of memory on the GPU used to store data that will
be processed by the graphics pipeline.

To create a buffer we invoke the function `gl.createBuffer` and it creates a empty buffer in the GPU and makes a buffer object in the WebGL Driver and returns it's handle(reference).

Code:
```js
const pointsBuffer = gl.createBuffer();
```


It would be more clear with the diagrams below:
<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765965103/uwkhhyn8oqo7nxbcz541.png" alt="">
</div>
<i style="font-size:1rem; text-align:center">System state before calling gl.createBuffer function</i>
</div> 

<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765965086/xo07x2yrji3sk2rrjc92.png" alt="">
</div>
<i style="font-size:1rem; text-align:center">System state after calling gl.createBuffer function</i>
</div> 

**Note: These arrows mark which variable points to which location and don't worry about the `ARRAY_BUFFER` and `ELEMENT_ARRAY_BUFFER` we will discuss it in the next point**

### 4. Bind Buffer to the target

In WebGL, buffers are bound to **targets**, which define how the data inside the
buffer will be used.

WebGL mainly uses two buffer targets, each with a different purpose.

1. `ARRAY_BUFFER`  
   This target is used to store **attribute data**.  
   Attribute data includes per-vertex information such as:
   - positions
   - colors
   - texture coordinates
   - normals

   The data stored in an `ARRAY_BUFFER` is read by the **vertex shader** through
   attribute variables.
2. `ELEMENT_ARRAY_BUFFER`  
   This target is used to store **index data**.  
   Index data specifies **which vertices from the `ARRAY_BUFFER` should be used
   and in what order to draw them**.

   This allows vertices to be **reused** and avoids storing duplicate vertex data.
   We will discuss more on this in chapter we make a 3D Cube.

Now as we have the point coordinates and we know that its an attribute so we will use the `ARRAY_BUFFER` as the target, and bind the Buffer object to this target.

Code:
```js
gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
```

Let's have a look at the system state after calling this function:
<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765965086/eo2kxae7hle5yahzyofh.png" alt="">
</div>
<i style="font-size:1rem; text-align:center">System state after calling gl.bindBuffer function. The double headed arrow shows the target binding</i>
</div> 

### 5. Insert data into the buffer
Once the buffer is bound to a target, we are all set to transfer data from the system memory
(RAM) to the GPU memory. This is done using the `gl.bufferData` function.

This function:
- allocates memory for the currently bound buffer
- uploads data into that memory<nav></nav>

`gl.bufferData` takes three arguments:
1. the buffer target (`ARRAY_BUFFER` or `ELEMENT_ARRAY_BUFFER`)
2. a typed array containing the data
3. a usage hint describing how the data will be used

You can say that this function instructs that put the data in this array into the memory location of buffer that is currently bound to the `gl.ARRAY_BUFFER`.

Code:
```js 
gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(pointsCoordinates), gl.STATIC_DRAW );
```
You might be wondering: what is `Float32Array`?

JavaScript arrays do not have a fixed data type. A normal JavaScript array can
contain mixed values such as numbers, strings, or objects:

`[34, "a", 5, "hello"]`

The GPU, however, works only with numbers.
It does not understand strings or mixed data types. In fact, GLSL does not even
have a string data type.

Because of this, WebGL requires data to be sent in a typed format, where every
element has the same data type and a known size in memory.

`Float32Array` is a typed array that guarantees:

- every element is a number

- each number is a 32-bit floating-point value

- the memory layout is predictable for the GPU

By converting the data into a `Float32Array`, we give the GPU a clear guarantee
about the type of data it will receive and how that data is laid out in memory.

There are other typed arrays as well (I copied this table from MDN docs ; )
| Type                | Value Range                     | Size (bytes) | Web IDL type           |
|---------------------|----------------------------------|--------------|------------------------|
| `Int8Array`         | -128 to 127                      | 1            | `byte`                 |
| `Uint8Array`        | 0 to 255                         | 1            | `octet`                |
| `Uint8ClampedArray` | 0 to 255                         | 1            | `octet`                |
| `Int16Array`        | -32768 to 32767                  | 2            | `short`                |
| `Uint16Array`       | 0 to 65535                       | 2            | `unsigned short`       |
| `Int32Array`        | -2147483648 to 2147483647        | 4            | `long`                 |
| `Uint32Array`       | 0 to 4294967295                  | 4            | `unsigned long`        |
| `Float16Array`      | -65504 to 65504                  | 2            | N/A                    |
| `Float32Array`      | -3.4e38 to 3.4e38                | 4            | `unrestricted float`  |
| `Float64Array`      | -1.8e308 to 1.8e308              | 8            | `unrestricted double` |
| `BigInt64Array`     | -2⁶³ to 2⁶³ − 1                  | 8            | `bigint`               |
| `BigUint64Array`    | 0 to 2⁶⁴ − 1                     | 8            | `bigint`               |


Of these we will be using only:

- `Float32Array`  
- `Uint16Array`  
- `Uint32Array` 

Moving on to the third argument of `gl.bufferData` which you can understand as a kind of **usage hint** to the GPU, it tells WebGL **how you intend to use the buffer data**.  
This is only a *hint* to the GPU driver — WebGL does not enforce it.

We commonly use two modes:

1. `gl.STATIC_DRAW`: 
Use this when the buffer data is set **once** and used many times for rendering.

2. `gl.DYNAMIC_DRAW`: 
Use this when the buffer data will be **updated frequently**, for example changing the data every frame . It works on the Allocating First, Filling Later When using `gl.DYNAMIC_DRAW`, you can first allocate memory on the GPU and then update it later using `gl.bufferSubData`.

    ```js
    const data = new Float32Array(pointsCoordinates)
    gl.bufferData(gl.ARRAY_BUFFER, 24, gl.DYNAMIC_DRAW);
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      0,  // byte offset in the GPU buffer where the data will be written
      data);
    ```
    This mode is mainly used in situations where the data is updated on the CPU and then rendered by the GPU,for example in particle simulations.

System state after invocation of the `gl.bufferData` function:

<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765965544/hhasixs6asr3trxtsmn0.png" alt="">
</div>
<i style="font-size:1rem; text-align:center">Transfer of data from RAM to the GPU buffer bounded to the target ARRAY_BUFFER</i>
</div>

### 6. Tell the GPU how to read the buffer

After the step 5 the GPU has the buffer data, now we need to tell the GPU how to read data from that buffer. To do this we invoke the function `gl.vertexAttribPointer`. This function is a bit complicated so let's see the calling statement first.
```js
gl.vertexAttribPointer(a_position_location, 2, gl.FLOAT, false, 0, 0);
```
It has a total of 6 args:

1. **Attribute Location**:  This specifies **which attribute in the vertex shader** this buffer data will be used for.  

2. **Size**: This says how many numbers make up one vertex, and in this example we know that each coordinate has two components, remember we used `vec2` in vertex shader as the type of `a_position`.

3. **Type**: Data type of the numbers, here its float hence `gl.FLOAT`.

4. **Normalized**: This parameter has an effect only when the data type is an integer (such as `gl.UNSIGNED_BYTE`, `gl.BYTE`, `gl.SHORT`, or `gl.UNSIGNED_SHORT`). When set to `true`, the integer values are **linearly mapped** to a floating-point range (`[0, 1]` for unsigned types and `[-1, 1]` for signed types) before being passed to the vertex shader.  
If the data type is `gl.FLOAT`, this parameter is ignored.

5. **Stride**:  Stride specifies the **number of bytes between the start of one vertex and the start of the next vertex** in the buffer. Applicable when more than one attribute in the buffer else you set it to 0

    - If `stride = 0`, WebGL assumes the data is **tightly packed** (no extra gaps between vertices).
    - If `stride > 0`, it tells WebGL that each vertex contains additional data (like color, normals, etc.) and how many bytes to skip to reach the next vertex.

    We will discuss this argument in detail in colored point chapter.

6. **Offset**: Offset specifies the **byte offset from the start of the buffer** where the data for this attribute begins.  
    It is mainly used when multiple attributes are stored in the same buffer.

    - If `offset = 0`, WebGL starts reading the attribute data from the **beginning of the buffer**.
    - If `offset > 0`, WebGL skips that many **bytes** from the start of the buffer before reading the attribute data.

    This value is always specified in **bytes**, not in number of elements.

We will discuss this argument in detail in the colored point chapter.
Don’t worry if you don’t fully understand this function yet — we will revisit it in the following chapters.  
For now, just understand that this function tells the GPU that for the attribute at location
`a_position_location`, it should read data from the buffer currently bound to `gl.ARRAY_BUFFER`,
and interpret that data as **pairs of two numbers** to form the attribute values.

### 7. Enable the attribute
This is the most **dangerous** step ; ) — if you forget this, nothing *seems* to work: no warnings, no errors.
(In this case, you will see a single point at the center of the screen.)

To enable the attribute you call the function `gl.enableVertexAttribArray`:

```js
gl.enableVertexAttribArray(a_position_location);
```

Enabling the attribute means you are telling the GPU that this attribute is **active** and should be
used during rendering. If an attribute is not enabled, the GPU ignores the buffer data associated
with it and instead uses a **default constant value** for that attribute for every vertex.

For position attributes, this default value is `(0, 0, 0, 1)`, so all vertices collapse to the same
position — the center of the screen — and appear as a single point.

### 8. Issue the draw call with the number of vertices you want to draw.

You have to draw 3 points, so issue the draw call with the last argument as 3

```
gl.drawArrays(gl.POINTS, 0, 3);
```

## Final Code
`script.js`
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
const fragmentShaderSource = `# version 300 es
precision mediump float;
out vec4 color;
void main(){
  color = vec4(1,0,0,1); 
}`;

// Step 3: Compile the shaders
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.log(
    "error while compiling the vertex shader",
    gl.getShaderInfoLog(vertexShader)
  );
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.log(
    "error while compiling the fragment shader",
    gl.getShaderInfoLog(fragmentShader)
  );
}

// Step 4: Create a WebGL program
const program = gl.createProgram();

// Step 5: Attach the shaders to the program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// Step 6: Link the program
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.log(
    "error while linking the program:",
    gl.getProgramInfoLog(program)
  );
}

const pointsCoordinates = [
  0, 0.5, // First point
  -0.5,-0.5, // Second point
  0.5,-0.5, // Third point
];

const a_position_location = gl.getAttribLocation(program, "a_position");
// Create Buffer
const pointsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(pointsCoordinates),
  gl.STATIC_DRAW
);
gl.vertexAttribPointer(a_position_location, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(a_position_location);
// Step 7: Use the WebGL program
gl.useProgram(program);

// Step 8: Issue the draw call
gl.drawArrays(gl.POINTS, 0, 3);

```