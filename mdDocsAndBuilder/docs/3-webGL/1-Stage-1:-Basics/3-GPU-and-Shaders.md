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

Before understanding what is Vertex and Fragment Shader, let's first understand what is a vertex and fragment.

1. **Vertex**:  
   A vertex represents a point in 2D or 3D space. These points are used to define shapes.  
   For example, a triangle is defined using **three vertices**.

2. **Fragment**:  
   When a shape is drawn, the GPU breaks the area covered by that shape into many pixel-sized pieces.  
   Each of these pieces that needs to be colored is called a **fragment**.

Now lets see shaders:

1. **Vertex Shader**:<br>A vertex shader is a GPU program that runs once for each vertex, for example in a triangle we have three vertices and the vertex shader will run 3 times, once for each vertex, in parallel.

<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1766475971/vbtqkcmxd2jrf3e6oqwv.png" alt="Vertex Shader illustration">
</div>
<i  class="image-description">Vertex shader illustration</i>
</div>

2. **Fragment Shader**:  
A fragment shader is a GPU program that runs once for each fragment. It runs after the vertex shader. The vertex shader defines the shape of the triangle, and then the pixels inside the triangle are determined as fragments. Only after this step are the fragment shaders executed.Fragment shaders run **in parallel**. For example, if a triangle covers 1000 pixel-sized areas, the fragment shader will be executed around 1000 times, once for each fragment. Because GPUs are designed for massive parallelism, many of these executions happen at the same time, making fragment processing extremely fast. This is where the GPU’s parallel processing power becomes apparent.

**Note:** The same vertex shader code is executed for every vertex, and the same fragment shader code is executed for every fragment. In other words, the GPU applies the same set of instructions to many different data elements, which is similar to a **SIMD (Single Instruction, Multiple Data)** style of processing.

<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1766476063/qg3u0epdoph74zhtan7m.png" alt="fragment shader illustration">
</div>
<i  class="image-description">Fragment shader illustration</i>
</div> 

### Writing Shaders

Shaders can be written in different languages, depending which graphics API you are using, but in **WebGL** we write shaders in a language called **GLSL**.

GLSL stands for **OpenGL shading language**, and is a language similar to C. Don't worry we will have a full length chapter on shaders and GLSL.  

---
<sup>1</sup> This is an overly simplified definition of GPU.

