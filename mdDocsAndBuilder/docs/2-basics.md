<!-- Computer Graphics Basics – Pixels, Resolution, Viewport & Animation -->
<!-- Learn the fundamentals of computer graphics including pixels, aspect ratio, resolution, viewport, framerate, and how animations work. A simple introduction to essential CG concepts with clean explanations. -->
<!-- computer graphics basics, pixels in graphics, aspect ratio, viewport in graphics, screen resolution, framerate, FPS, animation in graphics, CG fundamentals, introduction to computer graphics
 -->
# Basics

Before starting lets see the very basics of CG.

## Pixels

Pixels are the building blocks of an image, they are the smallest unit of an image.

## Aspect ratio

Aspect ratio is simply the ratio between the width of the screen to the height of the screen.

$$
Aspect\: Ratio = \frac{screen\:width}{screen\:height}
$$

## Screen Resolution

Resolution is the number of pixels in the screen.

$$
Resolution = pixels\:in\:width\times pixels\:in\:height
$$

## Viewport

Viewport is the part of the screen where your scene is drawn.

## What is a Frame?

To understand this, let’s first understand what a video is. A video is essentially a stream of images played so fast that it appears as continuous motion. Each individual image in this stream is called a frame.

## Framerate/Refresh rate of screen

**Framerate (FPS)** is the number of frames your **GPU/CPU** renders per second, more the framerate more smooth are the graphics. Framerate is also an indicator of how optimal your code is, if the frame rate drops below the screen refresh rate then you need to review your code. 

You can calculate the framerate in two ways:

1) Count how many frames are rendered in one second.
2) Measure the time between two consecutive frames and take its reciprocal.


Most screens have the framerate between 60 to 120.

## What is an animation?
An animation is a sequence of images (called frames) that are drawn, erased, and redrawn very quickly.
When these frames change fast enough, your eyes perceive it as smooth motion instead of individual pictures.

Lets see an example

<div class="img-external">
<div class= "img-container img-square">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765024464/mlepjvc3kln5vf8cbrmn.jpg" alt="sprite sequence">
</div>
<i  class="image-description">
Image showing a sequence of successive frames</i>
</div>

<div class="img-external">
<div class= "img-container img-square">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1765024350/yniaimqbejpwrhbs2caf.gif" alt="animation example">
</div>
<i  class="image-description">Animated GIF using the above sequence of images</i>
</div>

## What is rendering?

Rendering is basically making a scene ready to be displayed onto the screen. It is converting a **3D/2D scene to 2D**

## What is a Framebuffer?

Before displaying a frame, the hardware of any display device needs to store the color values of that frame somewhere, and that somewhere is called the **framebuffer**.

A framebuffer is a block of memory that stores information about each pixel for the current frame. Modern framebuffers often contain multiple kinds of buffers, such as:

- **Color buffer**: Stores the color of each pixel.
- **Depth buffer (z-buffer)**: Stores the distance of each pixel from the viewer, used for 3D rendering to determine which objects are in front.
- **Stencil buffer**: Stores mask information to control where drawing is allowed or blocked on the screen.

These buffers work together to produce the final image displayed on the screen.


## How a Modern Display Works

The steps below provide a **very high-level view** of how modern displays work:

1. GPU or video decoder generates a frame.
2. Frame is stored in the framebuffer (memory).
3. Display controller reads the framebuffer.
4. Pixels on the screen are illuminated accordingly.
5. Next frame is prepared while current frame is shown (double/triple buffering).
6. This repeats many times per second to create smooth motion.
