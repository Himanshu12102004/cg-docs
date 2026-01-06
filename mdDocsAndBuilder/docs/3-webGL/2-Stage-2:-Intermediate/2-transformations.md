# What are Transformations

In the last chapter, we learned about animations, where we moved a single point in a specific direction.

But what if we want to move an entire triangle, rotate it, or apply other changes that modify its vertices?

This is where **transformation matrices** come in. They provide a powerful and elegant way to manipulate objects in computer graphics. Let’s dive in and understand them in detail.

## Matrices

I hope you are familiar with matrices and basic operations like addition, subtraction, and multiplication.  

Keeping my promise to explain every bit of math except for the simplest operations, let's take a brief look at matrices and how they are useful in computer graphics.

**A matrix (singular of matrices) can be seen as a 2D array of numbers that has a fixed number of rows and columns.**

Example Matrix (3×3): 
$\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
$