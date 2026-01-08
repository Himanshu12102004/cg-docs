const svgBg = document.querySelector(".background1");
const contentBox = document.querySelector(".content-box");
const imageSources = [
  `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <g style="" transform="matrix(1.773018, 0, 0, 1.541234, -53.864162, -45.993988)">
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(50, 185, 210);" points="208.254 35.601 126.27 145.383 239.238 172.408"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(51, 183, 208);" points="52.379 92.454 208.438 34.843 125.056 146.711"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(61, 224, 255);" points="209.19 35.857 238.848 172.583 309.768 138.977"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(53, 182, 207);" points="51.495 92.282 33.707 245.726 123.369 146.332"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(61, 224, 255);" points="124.587 147.868 32.918 246.353 141.314 278.737"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(61, 224, 255);" points="126.278 145.862 142.342 280.387 236.33 172.462"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(61, 224, 255);" points="238.927 171.996 143.772 280.273 267.958 303.636"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(61, 224, 255);" points="240.637 173.072 310.138 138.483 268.848 302.995"/>
    <path style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(54, 182, 207);" d="M 31.886 247.146 L 142.656 280.531 L 135.605 350.487 L 31.886 247.146 Z"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-width: 7.24145px; stroke-linejoin: round; fill: rgb(54, 194, 220);" points="144.118 280.466 134.525 351.428 267.308 303.954"/>
  </g>
</svg>`,

  `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <defs>
    <linearGradient gradientUnits="userSpaceOnUse" x1="241.413" y1="158.317" x2="241.413" y2="247.454" id="gradient-0" gradientTransform="matrix(0.547357, -0.8369, 1.122467, 0.734124, -86.668601, 260.25117)">
      <stop offset="0" style="stop-color: rgb(29.412% 85.882% 58.039%)"/>
      <stop offset="1" style="stop-color: rgb(0% 51.47% 27.727%)"/>
    </linearGradient>
  </defs>
  <g style="" transform="matrix(2.498641, 0, 0, 3.203922, -268.875946, -358.243408)">
    <polygon style="stroke: rgb(0, 0, 0); fill: url(&quot;#gradient-0&quot;); stroke-linejoin: round; stroke-width: 4.20863px;" points="203.788 185.066 258.127 152.657 299.734 171.582 299.385 211.461 265.288 252.371 210.116 251.37"/>
    <polygon style="stroke: rgb(0, 0, 0); fill: rgb(75, 219, 148); stroke-linejoin: round; stroke-width: 4.20863px;" points="113.428 141.231 202.901 186.197 209.99 250.384 121.731 180.53"/>
    <polygon style="stroke: rgb(0, 0, 0); fill: rgb(87, 255, 172); stroke-linejoin: round; stroke-width: 4.20863px;" points="113.981 141.12 202.103 185.481 258.219 152.433 149.714 124.103"/>
  </g>
</svg>`,

  `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 490">
  <g style="" transform="matrix(1.133148, 0, 0, 1.128025, 1.376168, -4.445088)">
    <g transform="matrix(1.012708, 0, 0, 1.027023, 2.295669, 8.055264)" style="transform-origin: 217.053px 212.513px;">
      <path style="stroke: rgb(0, 0, 0); fill: rgb(255, 228, 82); stroke-width: 11.4985px; stroke-linejoin: round;" d="M 6.616 253.783 L 97.862 6.889 C 97.862 6.889 211.106 130.103 209.632 128.908 L 126.286 358.126 L 6.616 253.783 Z"/>
      <polygon style="stroke: rgb(0, 0, 0); fill: rgb(255, 220, 31); stroke-width: 10.614px; stroke-linejoin: round;" points="95.291 6.486 319.619 82.029 426.899 191.8 208.357 127.335"/>
      <path style="paint-order: fill markers; stroke: rgb(0, 0, 0); fill: rgb(242, 205, 0); stroke-width: 10.614px; stroke-linecap: round; stroke-linejoin: bevel;" d="M 210.543 126.636 L 127.288 359.234 L 344.977 418.539 L 427.489 191.176 L 210.543 126.636 Z"/>
    </g>
  </g>
</svg>`,

  `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <defs>
    <linearGradient gradientUnits="userSpaceOnUse" x1="257.139" y1="127.315" x2="257.139" y2="328.329" id="gradient-1" gradientTransform="matrix(-0.258169, -0.9661, 0.969473, -0.259069, 87.91751, 541.739494)">
      <stop offset="0" style="stop-color: rgb(72.941% 85.49% 33.333%)"/>
      <stop offset="1" style="stop-color: rgb(37.355% 50.439% 0%)"/>
    </linearGradient>
    <linearGradient gradientUnits="userSpaceOnUse" x1="191.172" y1="31.215" x2="191.172" y2="161.852" id="gradient-0" gradientTransform="matrix(-0.168965, -0.985621, 1.030988, -0.176743, 146.103102, 326.527953)">
      <stop offset="0" style="stop-color: #bada55"/>
      <stop offset="1" style="stop-color: #758d29"/>
    </linearGradient>
  </defs>
  <g style="" transform="matrix(1.577149, 0, 0, 1.649304, -64.771904, -50.477722)">
    <polygon style="stroke: rgb(0, 0, 0); fill: rgb(207, 243, 94); stroke-linejoin: round; stroke-width: 7.43851px;" points="87.52 79.967 194.528 161.438 145.896 290.357 47.124 209.823"/>
    <polygon style="stroke: rgb(0, 0, 0); fill: url(&quot;#gradient-0&quot;); stroke-linejoin: round; stroke-width: 7.43851px;" points="88.981 81.428 205.568 40.386 310.678 127.502 194.553 161.852"/>
    <polygon style="stroke: rgb(0, 0, 0); fill: url(&quot;#gradient-1&quot;); stroke-linejoin: round; stroke-width: 7.43851px;" points="145.807 290.296 195.403 160.934 311.628 127.315 350.173 231.472 260.471 327.493"/>
  </g>
</svg>`,

  `
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <g>
    <polygon style="stroke: rgb(0, 0, 0); stroke-linejoin: round; fill: rgb(170, 111, 255); stroke-width: 12px;" points="73.649 156.362 329.93 81.353 479.858 313.468 225.811 413.663"/>
    <polygon style="stroke: rgb(0, 0, 0); stroke-linejoin: round; fill: rgb(114, 69, 178); stroke-width: 12px;" points="21.337 415.867 59.54 224.049 72.947 156.736 226.861 414.549"/>
  </g>
</svg>
`,

  `
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <g style="" transform="matrix(1.576889, 0, 0, 1.57206, -99.814903, -59.439594)">
    <polygon style="stroke: rgb(0, 0, 0); fill: #FF8A1F; stroke-linejoin: round; stroke-width: 7.62159px;" points="167.252 43.182 67.896 279.599 226.444 355.313"/>
    <polygon style="stroke: rgb(0, 0, 0); fill: #FF7010; stroke-linejoin: round; stroke-width: 7.62159px;" points="226.448 354.512 376.95 247.499 167.856 43.096"/>
  </g>
</svg>
`,
  `
<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <g style="" transform="matrix(1.95127, 0, 0, 1.824636, -171.15126, -66.706413)">
    <polygon style="stroke: rgb(0, 0, 0); stroke-linejoin: round; fill: rgb(161, 17, 17); stroke-width: 6.35609px;" points="206.077 44.141 94.944 249.853 153.56 303.079"/>
    <polygon style="stroke: rgb(0, 0, 0); fill: rgb(255, 27, 27); stroke-linejoin: round; stroke-width: 6.35609px;" points="154.035 302.651 274.176 302.878 205.622 44.259"/>
    <polygon style="stroke: rgb(0, 0, 0); fill: rgb(255, 27, 27); stroke-linejoin: round; stroke-width: 6.35609px;" points="205.779 43.478 274.862 303.415 333.98 255.126"/>
  </g>
</svg>`,
];
function scatterSvgs({
  container,
  svgs,
  count = svgs.length,
  minSize = 80,
  maxSize = 220,
}) {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const contentBox = document.querySelector(".content-box");
  const avoidRect = contentBox.getBoundingClientRect();
  const padding = 40;

  const shuffled = [...svgs].sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i++) {
    let attempts = 0;

    while (attempts < 50) {
      attempts++;

      const size = minSize + Math.random() * (maxSize - minSize);
      const x = Math.random() * w;
      const y = Math.random() * h;

      const half = size / 2;

      const overlapsContent =
        x + half > avoidRect.left &&
        x - half < avoidRect.right &&
        y + half > avoidRect.top &&
        y - half < avoidRect.bottom;

      if (overlapsContent) continue;

      const el = document.createElement("div");
      el.innerHTML = shuffled[i];

      el.style.position = "absolute";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.width = `${size}px`;
      el.style.transform = `translate(-50%, -50%) rotate(${
        Math.random() * 360
      }deg)`;
      el.style.pointerEvents = "none";
      el.style.zIndex = "-1";
      const svgEl = el.querySelector("svg");
      svgEl.style.width = "100%";
      svgEl.style.height = "auto";
      container.appendChild(el);
      break;
    }
  }
}

scatterSvgs({
  container: svgBg,
  svgs: imageSources,
  count: 7,
  minSize: 100,
  maxSize: 250,
});

// Light/Dark Mode Toggle Script

const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
// Do not think that saved theme is undefined its in the template
if (savedTheme === "dark") {
  sunIcon.classList.add("hide");
  moonIcon.classList.remove("hide");
} else {
  moonIcon.classList.add("hide");
  sunIcon.classList.remove("hide");
}
function toggleTheme() {
  const lightNow = root.classList.toggle("light");

  if (lightNow) {
    moonIcon.classList.add("hide");
    sunIcon.classList.remove("hide");
    localStorage.setItem("theme", "light");
  } else {
    sunIcon.classList.add("hide");
    moonIcon.classList.remove("hide");
    localStorage.setItem("theme", "dark");
  }
}

document.querySelector(".theme-toggler").addEventListener("click", toggleTheme);
