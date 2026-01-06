<!-- Introduction -->
<!-- Learn essential computer graphics concepts with clear explanations and visuals. CG Docs covers vectors, transformations, lighting, rendering, and everything you need to build strong graphics foundations. -->
<!-- computer graphics, graphics fundamentals, CG basics, vectors in graphics, transformations, rendering pipeline, 3D graphics, 2D graphics
 -->
# Why these docs?

When I started out to learn Computer Graphics I struggled a lot to find a clear step by step resource, I fidgeted between youtube tutorials, medium articles, books, websites etc.

After doing all this, I realized that the resources for learning Computer Graphics are so scattered that it becomes overwhelming for a beginner to even know where to start, so I decided to write these docs in a beginner friendly and chronological manner, so that anyone could learn it easily. 

We’ll be using **WebGL** as our graphics API.  
Since it requires very little setup compared to other graphics APIs, we can spend more time focusing on **graphics concepts** and less time fighting with configurations.
This also makes WebGL **beginner-friendly**, allowing you to see results quickly while still learning ideas that apply to more advanced graphics APIs later on.


## What is Computer Graphics

Computer Graphics is basically a field of Computer Science that deals with  generating, rendering and displaying digital images. 

So, this was a technical definition. Now let’s understand it in plain terms using a game you probably already know — **GTA: San Andreas**.

In the game, **CJ can move in any direction at any time** — left, right, forward, or backward — entirely based on your input. The computer has no idea in advance where you’ll go next.

Now, when **you press the up arrow key**, the computer detects this input and does following things:

1. Calculates the next position of **CJ** in the scene.
2. Calculates the position of each surrounding object with respect to new camera position
3. The scene is 3D but the screen is 2D now we need to convert the 3D scene to 2D .
4. The final 2D scene is displayed on your screen.

Doing all this stuff each frame is what Computer Graphics deals with.

This is a very high level view of the steps but actually there are dozens of intermediate steps which we will look in the chapters ahead.
 
## Why Computer Graphics

Before we dive into Computer Graphics, let’s answer the big question — why even learn it?<br>The following points will explain:

- Got an Idea for a **game**? Now you can make it without using any game engine
- Like to see **fluid or smoke simulations**? Now you can code it
- Bad at drawing? I got your back, now you can make drawings impossible to draw by hand
- Curious about what secret sauce powers Unity and Unreal? Well… why not cook up your own **game engine** from scratch? <sup>**1**</sup>
- And many more things but it will take whole day to write them all, so I am quitting here ; )

**To keep up your motivation level let's see what I have built along the way learning CG:**

<div style="
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
">
  <a href="https://alienworld-himanshu.vercel.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1752429226/fractals/dhxwr4svvhqmi6fcwgm2.png" alt="Alien World" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://factory-himanshu.vercel.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764065331/ve1hqosh3dbx6dxpdbfa.png" alt="Factory" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://alienworld-himanshu.vercel.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1752406386/fractals/j9uyx25t2v9m4f0inrsq.png" alt="Alien World" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://sketchy-himanshu.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764065984/swgpt6lhanvxx9rln1yk.png" alt="Sketchy" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://dda-himanshu-gupta.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764066170/vn4y68c9tn4boa2v2scl.png" alt="DDA Algorithm" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://fourier-grapher-himanshu.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764066416/s6hwj1qiskywbdlnnal5.png" alt="Fourier Grapher" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://pythaorean-tree-himanshu.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764070935/pjil5majln44jye9peeo.png" alt="Pythagorean Tree" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://conways-game-of-life-himanshu.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764066429/dc4v69scuwiiomivpcdr.png" alt="Conway's Game of Life" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://wave-animations-himanshu.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764066798/aeklk7fcd8illhrz4wvy.png" alt="Wave Animations" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://mandelbrot-explorer.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764070898/resmc0nnqlwu3zofh7hv.png" alt="Mandelbrot Explorer" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://tree-fractal-himanshu.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764070412/lkvdabtxzg0tkhwfpaoy.png" alt="Tree Fractal" style="width:100%; border-radius: 8px;" />
  </a>
  <a href="https://julia-set-himanshu.netlify.app/" target="_blank">
    <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764070715/x6mqolvcrlc9nkuu0epz.png" alt="Julia Set" style="width:100%; border-radius: 8px;" />
  </a>
</div>

## How to use the docs

When studying CG<sup>1</sup>, make sure to keep a notebook and a pen handy — the more you write, the more you learn.
Code it along, don't just read.
Also, don’t skip chapters until you’re confident you understand them well, because each chapter builds
on top of the previous ones.
 

Stay consistent, explore deeply, and most importantly — ***Happy Learning!***

---

<sup>1</sup> Not to demotivate you or anything, but creating a full game engine by yourself is a loooong quest — like final-boss-level long

<sup>2</sup> I will say Computer Graphics as CG from now onwards as it takes too long to type it, and programers are lazy you know
