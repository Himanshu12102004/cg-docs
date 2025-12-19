# GPU & Shaders Explained
You made your first CG program in the last chapter, but you came here for GPU rendered graphics, right?
Well, well today we will be getting ready for that with some basic terminology.

## What is GPU?
If you are a gamer, you would already be familiar with GPUs, but to make these docs complete I need to explain a bit about them.

So GPU (Graphical Processing Unit) is a brother of CPU that has thousands of basic arithmetic cores (very basic CPUs) that work in parallel and independent of each other to perform tasks.<sup>1</sup>

## How to run programs on the GPU?

To make the CPU perform a task, we write a program and execute it. The same idea applies to the GPU. To execute custom logic on the GPU, we write small programs called **shaders**. These shaders are executed on the GPU through graphics APIs (such as WebGL, OpenGL, or Vulkan), which act as an interface between our code and the GPU hardware.

Although the underlying hardware differs between GPU manufacturers, graphics APIs provide a unified and portable way to run shader programs without dealing with hardware-specific details.

## What is a shader?
A shader is a small program that runs on the GPU, operating on many data elements in parallel.

### Types of shaders
There are mainly three types of shaders:
1. Vertex Shader
2. Fragment Shader
3. Compute Shaders (not supported by WebGL, so we will not discuss them here)

Before understanding what is a Vertex Shader and Fragment Shader, let's first understand what is a vertex and fragment.

1. **Vertex**:  A vertex represents a point in 2D or 3D space and is used to define a graphics primitive. For now, assume that the graphics primitive is a triangle, in which case three vertices define its shape.

2. **Fragment** : All the pixels that fall inside the triangle, and need to be painted are the fragments.

Now lets see shaders:

1. **Vertex Shader**:<br>A vertex shader is a GPU program that runs once for each vertex, for example in a triangle we have three vertices and the vertex shader will run 3 times, once for each vertex, in parallel.

<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765783977/wkewu72kzpmvh94ryccm.png" alt="Vertex Shader illustration">
</div>
<i style="font-size:1rem; text-align:center">Vertex shader illustration</i>
</div>

2. **Fragment Shader**:  
A fragment shader is a GPU program that runs once for each fragment. It runs after the vertex shader. The vertex shader defines the shape of the triangle, and then the pixels inside the triangle are determined as fragments. Only after this step are the fragment shaders executed, and they run in parallel. For example, if a triangle covers 1000 pixels, the fragment shader will run 1000 times, in parallel and the entire operation will take the time equivalent to processing just on fragment <sup>2</sup>. This is where you can see the massive parallel processing power of the GPU.

<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765783915/eonx58z4eg4dencvxqwv.png" alt="fragment shader illustration">
</div>
<i style="font-size:1rem; text-align:center">Fragment shader illustration</i>
</div> 

### Writing Shaders

Shaders are written in GLSL (OpenGL Shading Language), a language similar to C.  
Even if you’re not familiar with C, the syntax is simple enough to grasp quickly.

For WebGL (JavaScript), shaders are written as **JavaScript strings** that are passed to the WebGL API.

We’ll cover shaders in much more detail in later chapters, so don’t worry if it seems confusing now. : )


---
<sup>1</sup> This is an overly simplified definition of GPU.

<sup>2</sup> Subject number of cores in GPU
