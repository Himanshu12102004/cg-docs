<!-- Overview -->
<!--
Overview of WebGL and the evolution of CG on the web.
This section explains how the web moved from static pages to interactive graphics,
introduces WebGL in a beginner-friendly way, and explains why learning WebGL is useful
for understanding modern CG.
-->
<!--
CG, webgl, web graphics, cg basics, CG fundamentals,
2d graphics, 3d graphics, gpu rendering, canvas, web development graphics,
graphics pipeline, real-time rendering
-->
# Overview
With the release of JavaScript in 1995, we had a way to write some logical program that could be run on the browser. It ended the era of static webpages that were merely used to display information no real time interaction, no client side logic.

This was a major leap in web development. However, as websites became more complex, developers started
feeling the need of graphics such as dynamic charts, graphs, and custom drawings, but at that time,
HTML had no native way to draw graphics programmatically.  
Then in 2004 Apple released the **canvas** tag for Safari, which had the capability to draw 2D CPU rasterized graphics on the web. It was soon adapted by other browsers and the support for 2D CPU graphics was widely available on browsers.

Still, GPU-rasterized CG was largely limited to native applications written in C/C++ using OpenGL. Then, in 2011, WebGL<sup>1</sup> was released, finally providing access to the GPU directly from
within the browser.

Now enough of trash talking : ) , we will discuss about the evolution of WebGL some other day let's dive straight into it.

## What is WebGL?

From a beginners perspective, WebGL can be seen as a way to make dynamic 2D/3D scenes in the web browser, I don't want to scare you away by saying heavy words like WebGL is a low-level, JavaScript API that provides direct, programmable access to the GPU inside the browser for rendering real-time 2D and 3D graphics. Oops! I said it ; )

## Why learn WebGL?

1. WebGL is a good starting point for leaning CG as it is lot more simpler than any other API like Vulkan or DirectX.

2. You need nothing more than a simple text editor and a web browser. When you compare it with OpenGL there is a lot more stuff to do like making window and all.

3. Easy to share and host. Host it like any other website and share the link.

4. You can use other HTML elements along with the graphics,
with this you can make your stunning 3D portfolio.

## What do you need to proceed further

1. A decent PC.
2. A Text editor and a browser.
3. A little bit of maths (addition, subtraction, multiplication and division), anything other than these will be discussed on the spot.
4. A little bit of HTML and Js.
5. No prior CG experience needed
