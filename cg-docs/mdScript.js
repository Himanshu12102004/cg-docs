// Sidebar Folder State Management Script

let openFolders = JSON.parse(localStorage.getItem("openFolders")) || [];
function formatName(name) {
  return name
    .replace(/\.md$/, "")
    .replace(/(^\w|-\w)/g, (m) => m.replace("-", " "));
}
function capitalizeFirstLetter(docName) {
  let output = docName[0].toUpperCase();
  for (let i = 1; i < docName.length; i++) {
    if (docName[i - 1] == " ") output += docName[i].toUpperCase();
    else output += docName[i];
  }
  return output;
}
function putUrlInOpenFolders() {
  const currentUrl = window.location.href;
  const docsIndex = currentUrl.indexOf("/docs/");
  let currentDocPath = "";
  let whereAmIElement = document.querySelector(".whereAmI");
  if (docsIndex !== -1) {
    currentDocPath = currentUrl.substring(docsIndex + 6);
  }
  let folderParts = currentDocPath.split("/");
  const formattedParts = folderParts.map((part) => formatName(part));
  const mergedParts = formattedParts.join("/").split(".html")[0];
  console.log("Merged Parts:", mergedParts);
  const openedFile = document.querySelector(`[data-key-path="${mergedParts}"]`);
  console.log("Opened File Element:", openedFile);
  if (openedFile) {
    openedFile.classList.add("openedArticle");
  }
  if (folderParts.length <= 1) {
    whereAmIElement.style.display = "none";
    return;
  }
  if (folderParts.length > 0) {
    let cumulativePaths = [];
    let whereAmIHtml = ``;
    console.log("Formatted Parts:", formattedParts);
    for (let i = 0; i < formattedParts.length - 1; i++) {
      let partialPath = formattedParts.slice(0, i + 1).join("/") + "/";
      cumulativePaths.push(partialPath);
      whereAmIHtml += `<span class="whereAmIBreadCrumb">${capitalizeFirstLetter(
        formattedParts[i]
      )}</span><span class="whereAmIBreadCrumbSeparator"> > </span>`;
    }
    whereAmIElement.innerHTML =
      whereAmIHtml +
      `<span class="whereAmICurrentDoc">${capitalizeFirstLetter(
        formattedParts[formattedParts.length - 1].replace(".html", "")
      )}</span>`;

    cumulativePaths.forEach((path) => {
      if (!openFolders.includes(path)) openFolders.push(path);
    });

    localStorage.setItem("openFolders", JSON.stringify(openFolders));
  }
}
putUrlInOpenFolders();
function initSidebarState() {
  const currentUrl = window.location.href;
  const docsIndex = currentUrl.indexOf("docs/");
  console.log(openFolders);
  openFolders.forEach((folderPath) => {
    const toggle = document.querySelector(
      `.folder-toggle[data-key-path="${folderPath}"]`
    );

    if (toggle) {
      toggle.parentElement.classList.add("open");
    }
  });
}

initSidebarState();

function saveOpenFolders() {
  localStorage.setItem("openFolders", JSON.stringify(openFolders));
}

document.querySelectorAll(".folder-toggle").forEach((toggle) => {
  const folderPath = toggle.getAttribute("data-key-path");
  toggle.addEventListener("click", () => {
    const parent = toggle.parentElement;
    parent.classList.toggle("open");

    if (parent.classList.contains("open")) {
      if (!openFolders.includes(folderPath)) {
        openFolders.push(folderPath);
      }
    } else {
      openFolders = openFolders.filter((path) => path !== folderPath);
    }

    saveOpenFolders();
  });
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
    hljsLink.href =
      "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css";
  } else {
    sunIcon.classList.add("hide");
    moonIcon.classList.remove("hide");
    localStorage.setItem("theme", "dark");
    hljsLink.href =
      "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css";
  }
}

document.querySelector(".theme-toggler").addEventListener("click", toggleTheme);

// Phone Menu Toggle Script

const menuOpenIcon = document.querySelector(".hamburgerMenu");
const menuCloseIcon = document.querySelector(".menuClose");
const sidebarElement = document.querySelector(".sidebar");
const overlayElement = document.querySelector(".overlay");
function openMenu() {
  sidebarElement.classList.add("open");
  overlayElement.classList.add("active");
}
function closeMenu() {
  sidebarElement.classList.remove("open");
  overlayElement.classList.remove("active");
}
menuOpenIcon.addEventListener("click", openMenu);
menuCloseIcon.addEventListener("click", closeMenu);
