# WebGL: State Machine

You may remember that in the chapter **Draw Multiple Points**, I repeatedly used phrases like **“System State before calling this”** and **“System State after calling that”**, especially as captions under diagrams.

At that time, these phrases were introduced without fully explaining *what this “system state” actually is*.

I also intentionally left a few notes like:

- **NOTE:** Binding a buffer to a target may not make sense right now.  
  *Bear with me—we will discuss this in the WebGL: State Machine chapter.*
- **NOTE:** Use the program before making the `vertexAttribPointer` call.  
  *I will explain this later in the WebGL: State Machine chapter.*


This chapter exists to finally connect all those dots.

Here, we will understand:
- what “system state” really means in WebGL,
- why the **order** of function calls matters,
- why WebGL behaves differently from normal function-based APIs,
- and why certain rules (like using a program before setting attributes) are not arbitrary, but a direct result of WebGL being a **state machine**.

Once you understand this chapter, many things that earlier felt like “rules to memorize” will start to feel logical and obvious.

## What does "State" mean in WebGL

Imagine you are going to draw on a piece of paper. Before you start, you decide:

- The size of the paper (say A3)  
- What you are going to draw (say a house)  
- The pencil you will use (say HB1)  

Now, when you make each stroke, you **don’t have to repeat** “Use A3 paper, take the HB1 pencil, draw a house.” You already decided all of that, and your brain **remembers it as a state**.

WebGL works in a very similar way:

- You set the **canvas size**  
- You decide **what to draw** and put it in **buffers** as vertex data  
- You create **shaders** and a **program**  and **use** it. 

When you call `gl.drawArrays()` or `gl.drawElements()`, WebGL **doesn’t need you to repeat all the details**. It simply looks at the **current state**—the buffers, shaders, and program you’ve set—and draws using that information.  

In short, **WebGL remembers your settings (state)** so you don’t have to specify them every time you draw.
Now that you have an idea of what "state" means in WebGL, let's address your common doubts:

## Why bind buffers to a target?

At any given time, you can have multiple buffers—for example:  
- a **vertex coordinate buffer**  
- a **color buffer**  

Binding a buffer to a **target** tells WebGL **which buffer should be used for subsequent operations**.  

## Why two different types of targets: `ARRAY_BUFFER` and `ELEMENT_ARRAY_BUFFER`?

The reason is **predictability and performance**:

- When you bind a buffer to **`ARRAY_BUFFER`**, the GPU knows:  
  *“This buffer contains per-vertex data such as positions, colors, or normals.”*  

- When you bind a buffer to **`ELEMENT_ARRAY_BUFFER`**, the GPU knows:  
  *“This buffer contains index data that references vertices in an `ARRAY_BUFFER`.”*  

By explicitly telling the GPU how a buffer will be used, it can **store and interpret the data efficiently**, improving performance and making behavior more predictable.  

So when you call `vertexAttribPointer`, WebGL **stores this information as part of its state**:  
*“For this attribute location, use the data from the buffer that is currently bound to `ARRAY_BUFFER` at the time of this call, and interpret it according to this specification—until this state is changed by another call.”*

This makes it clear that WebGL remembers **the buffer and its layout at the moment of the call**, illustrating how the **state machine** works: once set, this state persists for subsequent draw calls until explicitly changed.


## Why call `gl.useProgram` before `gl.vertexAttribPointer`?

Before understanding this, let’s clarify **attribute locations** you get by calling the function `gl.vertexAttribLocation`:  

- Attribute locations are natural numbers.  
- By default, they are assigned **in order of their declaration** in the vertex shader: the first attribute gets location 0, the second gets 1, the third gets 2, and so on (unless explicitly specified).  
- These locations are **fixed at program linking** and do not change during the lifetime of the program.

Example in GLSL:

```glsl
in vec3 a_position; // location -> 0
in vec3 a_normal;   // location -> 1
in vec3 a_color;    // location -> 2
```
These sequential natural numbers introduce a specific nuance: if you use more than one program, different programs can have attributes assigned to the same locations. Let’s understand this with the example below:

- **Program A** has three attributes: `a_position`, `a_normal`, `a_color`  
  - Location 0 → `a_position`  
  - Location 1 → `a_normal`  
  - Location 2 → `a_color`  

- **Program B** has two attributes: `a_position`, `a_color`  
  - Location 0 → `a_position`  
  - Location 1 → `a_color`  

Now let’s say you want to draw:
- a **triangle** using **Program A**
- a **square (triangle strip)** using **Program B**

And you do the following:

1. Create a buffer for the **triangle data**.
2. Bind this buffer to the target `gl.ARRAY_BUFFER`.
3. Upload the triangle vertex data into the buffer.
4. Call `gl.vertexAttribPointer` to say:  
   *“For attribute location 0, use the buffer currently bound to `ARRAY_BUFFER` (triangle buffer).”*

5. Create another buffer for the **square data**.
6. Bind this buffer to the target `gl.ARRAY_BUFFER`.  
   > At this point, the **square buffer** is now bound to `ARRAY_BUFFER`, not the triangle buffer.
7. Call `gl.vertexAttribPointer` again to say:  
   *“For attribute location 0, use the buffer currently bound to `ARRAY_BUFFER` (square buffer).”*  
   > This **overwrites the previous state** for attribute location 0.

8. Now you call `gl.useProgram(ProgramA)` and issue:
   ```js
   gl.drawArrays(gl.TRIANGLES, 0, 3);
   ```
   Even though you are now using **Program A** (the triangle program), **attribute location 0 still points to the square buffer**, because that was the **last attribute state that was set** using `gl.vertexAttribPointer`, so the triangle program will use the vertices of the square and make a triangle using the first three coordinates of the square.
9. Now you call `gl.useProgram(ProgramB)` and issue:
   ```js
   gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
   ```
   This draw call again uses the square buffer and draws the square.

Now you can clearly see how the **WebGL state machine** works.

The key takeaway is this:

- `gl.vertexAttribPointer` **captures state**:
  - which attribute location
  - which buffer was bound to `ARRAY_BUFFER` *at the time of the call*
  - how the data should be interpreted

- This state is **global** and **persists** until you change it again, regardless of which program is currently active.

That is why I strongly recommend the following order to avoid hard-to-find bugs:

1. Upload data into buffers (`gl.bufferData`)  
   - This can be done **anytime earlier**; it does **not** depend on the active program.
2. Call `gl.useProgram` for the program you intend to draw with.
3. Bind the correct buffer to `gl.ARRAY_BUFFER`.
4. Call `gl.vertexAttribPointer` to set the attribute state.
5. Issue the draw call.

By following this order, you ensure that the **attribute state matches the program you are drawing with**, making your code predictable and easier to reason about.

 **Note:**  
 This order can be treated as a **convention**, not a strict rule.  
  What truly matters is that the **correct `gl.vertexAttribPointer` state is set before the draw call**.  
 As long as the attribute state matches the intended program and buffers at draw time, WebGL will work correctly.
