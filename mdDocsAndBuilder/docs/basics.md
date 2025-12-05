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

## Framerate/Refresh rate of screen

**Framerate (FPS)** is the number of frames your **GPU/CPU** renders per second.

You can calculate the framerate in two ways:

1) Count how many frames are rendered in one second.
2) Measure the time between two consecutive frames and take its reciprocal.
$$
Framerate = \frac{1}{time\:elapsed\:between\:two\:frames}
$$
Most screens have the framerate between 60 to 120.

## What is an animation?
An animation is a sequence of images (called frames) that are drawn, erased, and redrawn very quickly.
When these frames change fast enough, your eyes perceive it as smooth motion instead of individual pictures.

