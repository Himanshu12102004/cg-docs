<!-- Mathematics Basics for Computer Graphics — Coordinates, Angles & Trigonometry -->
<!-- A beginner-friendly refresher on the essential mathematics used in computer graphics. Learn Cartesian coordinate systems (2D & 3D), left-handed vs right-handed systems, angle conversions, and key trigonometric identities needed for rendering, transformations, and graphics algorithms. -->
<!-- computer graphics basics, math for computer graphics, 2D cartesian plane, 3D coordinate systems, left handed coordinate system, right handed coordinate system, angle conversion radians degrees, trigonometric identities, sine rule, cosine rule, cg mathematics, graphics coordinate geometry,vectors and geometry CG -->

# Basics

This section reviews the fundamental mathematical concepts used in these articles. If you're already comfortable with them you can skip ahead; otherwise use this section to refresh the basics.

## Cartesian Coordinate System

The Cartesian coordinate system is the backbone of computer graphics.  
We can classify it into two seperate secions 2D and 3D.

### 2D cartesian plane

The graph paper we all used in school is nothing but the 2D Cartesian plane we’re talking about.

<div class="img-external">
<div class= "img-container">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cartesian-coordinate-system.svg/2560px-Cartesian-coordinate-system.svg.png" alt="Cartesian plane">
  <span class="img-credit">Image credit: Wikipedia Commons</span>
</div>
<i style="font-size:0.8rem">Image representing 2D cartesian Plane</i>
</div>

### 3D Cartesian System

The 3D cartesian system is a bit complicated than its 2D counterpart.  
We have 2 different systems in this.
1. Left-handed coordinate spaces
2. Right-handed coordinate spaces

An analogy to undestand this is the Fleming's left and right hand rules which you must have studied in your high school physics class.  But here there is a little difference instead of *motion*, *field*, *current* we have x, y and z axes.


<div style="display:flex; justify-content:center; gap:1rem;">
<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764252605/iqblvtojulxfowxfz9xz.png" alt="Cartesian plane" alt="fleming-left hand rule">
  <span class="img-credit">Image credit: Wikipedia Commons</span>
</div>
<i style="font-size:0.8rem; text-align:center">Fleming's left hand rule with left-handed cartesian system</i>
</div>
<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764252604/a2ymxlqkbtahduhjetkx.png" alt="fleming-left hand rule">
  <span class="img-credit">Image credit: Wikipedia Commons</span>
</div>
<i style="font-size:0.8rem; text-align:center">Fleming's right hand rule with right-handed cartesian system</i>
</div>
</div>

The table below will help you uderstand.  

| Finger | Representation |
|----------|----------|
| Middle Finger    | *+x axis*   |
| Thumb   | *+y axis*   |
| Index Finger    | *+z axis*   |

### Why two systems?

In a Cartesian coordinate system, two sets of axes are considered the same if one can be transformed into the other by rotation alone, as long as the rotation keeps the origin fixed.  
However, when we compare a right-handed system with a left-handed system, no amount of such rotation can make one align perfectly with the other. This means they represent two fundamentally different ways to orient the axes in 3D space — and that’s why both systems exist.

### How to convert between right-handed and left-handed systems

There are two basic operations that change the handedness of a coordinate system:

1. **Flipping an axis direction**  
   Reversing the positive direction of one axis changes handedness.  
   An odd number of flips → handedness changes  
   An even number of flips → handedness stays the same (just rotation)

2. **Swapping two axes**  
   Exchanging any two axes also changes handedness.  
   Again — odd number of swaps → different handedness  
   Even number → same handedness (but rotated)

### Which one is better?

There is better or worse choice it depends which system you are comfortable with and which system is used in the environment you are working for example in Linear algebra we prefer to work with the right handed system but in computer graphics we use left handed system.  
**Since we are studying computer graphics we would use the Left handed system in these docs but the core concepts remain the same and can be applied in the other one as well.**

## Angles Drgrees and radians

This is another topic that we all are familiar with but but still lets brush it up.

Angles can be represented in two ways:

1. Degrees → One full circle is 360°
2. Radians → One full circle is 2π

### Conversion between deg to rad and vice versa

1. **Deg → Rad**  
   $$
   rad = deg \times 0.017453 \:\:(0.017453 = \frac{\pi}{180})
   $$

2. **Rad → Deg**  
   $$
   deg = rad \times 57.29578 \:\:(57.29578 = \frac{180}{\pi})
   $$

## Trigonometric Identities

### Basic itentities

1. $\;\sin^2\theta + \cos^2\theta = 1$

2. $\;1 + \tan^2\theta = \sec^2\theta$

3. $\;1 + \cot^2\theta = \csc^2\theta$

### Angle Sum & Difference Identities

1. $\;\sin(a+b) = \sin a \cos b + \cos a \sin b$

2. $\;\sin(a-b) = \sin a \cos b - \cos a \sin b$

3. $\;\cos(a+b) = \cos a \cos b - \sin a \sin b$

4. $\;\cos(a-b) = \cos a \cos b + \sin a \sin b$

5. $\;\tan(a+b) = \frac{\tan a + \tan b}{1 - \tan a \tan b}$

6. $\;\tan(a-b) = \frac{\tan a - \tan b}{1 + \tan a \tan b}$

### Double Angle Identities

1. $\;\sin 2\theta = 2\sin\theta\cos\theta$

2. $\;\cos 2\theta = \cos^2\theta - \sin^2\theta
= 2\cos^2\theta - 1
= 1 - 2\sin^2\theta$

3. $\;\tan 2\theta = \frac{2\tan\theta}{1 - \tan^2\theta}$

### Sine Rule
<div class="img-external">
<div class= "img-container">
  <img src="https://res.cloudinary.com/dni3bvxqo/image/upload/v1764428361/zp9xy3zcytthzorb6bpc.png" alt="fleming-left hand rule">
  <span class="img-credit">Image credit: Curtin University</span>
</div>
<i style="font-size:0.8rem; text-align:center">Reference image for sine and cosine rule</i>
</div>
</div>

1. $\;\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}$

### Cosine Rule

1. $\;a^2 = b^2 + c^2 - 2bc\cos A$

2. $\;b^2 = a^2 + c^2 - 2ac\cos B$

3. $\;c^2 = a^2 + b^2 - 2ab\cos C$

