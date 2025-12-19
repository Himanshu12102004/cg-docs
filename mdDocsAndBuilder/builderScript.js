import { readdir, readFile, mkdir, writeFile, stat } from "fs/promises";
import path from "path";
import { marked } from "marked";
import katex from "katex";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import chokidar from "chokidar";
import { fileURLToPath } from "url";
import fs from "fs";
import getSortedFolderStructure from "./sortedFolderStr.js";
import generateSidebarHTML from "./sideBarGenerator.js";
import envVariables from "./env.js";

import { getHtmlFilePath, removeNumericPrefixes } from "./utils.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.resolve(__dirname, "docs");
const srcRoot = inputDir;
const outputDir = path.resolve(__dirname, "../cg-docs/docs");
const templatePath = path.resolve(__dirname, "template.html");
let folderStr = {};
let flattenedIndexList = [];
let sidebarHTML = "";

const templateHTML = await readFile(templatePath, "utf-8");
marked.use({
  extensions: [
    {
      name: "math-block",
      level: "block",
      start(src) {
        return src.match(/\$\$/)?.index;
      },
      tokenizer(src) {
        const match = /^\$\$([^$]+)\$\$/s.exec(src);
        if (match) {
          return {
            type: "math-block",
            raw: match[0],
            text: match[1].trim(),
          };
        }
      },
      renderer(token) {
        return katex.renderToString(token.text, {
          throwOnError: false,
          displayMode: true,
        });
      },
    },
    {
      name: "math-inline",
      level: "inline",
      start(src) {
        return src.match(/\$/)?.index;
      },
      tokenizer(src) {
        const match = /^\$([^\$]+)\$/s.exec(src);
        if (match) {
          return {
            type: "math-inline",
            raw: match[0],
            text: match[1].trim(),
          };
        }
      },
      renderer(token) {
        return katex.renderToString(token.text, {
          throwOnError: false,
        });
      },
    },
  ],
});

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

function wrapHTML(
  content,
  cssAndJsFileLocation,
  pageTitle,
  pageDescription,
  pageKeywords,
  pageUrl,
  prevPage,
  nextPage
) {
  return templateHTML
    .replace(/{content}/g, content)
    .replace(/{sidebar}/g, sidebarHTML)
    .replace(/{prevPage}/g, prevPage ? prevPage : "#")
    .replace(/{nextPage}/g, nextPage ? nextPage : "#")
    .replace(/{cssAndJsFileLocation}/g, cssAndJsFileLocation)
    .replace(/{pageTitle}/g, pageTitle)
    .replace(/{pageDescription}/g, pageDescription)
    .replace(/{pageKeywords}/g, pageKeywords)
    .replace(/{pageUrl}/g, pageUrl)
    .replace(/<!--[\s\S]*?-->/g, "");
}

async function processFile(srcPath) {
  const relative = path.relative(srcRoot, srcPath);
  const destPath = getHtmlFilePath(outputDir, relative);
  await mkdir(path.dirname(destPath), { recursive: true });

  const depth = relative.split(path.sep).length - 1;
  const cssAndJsFileLocation = "../".repeat(depth + 1);
  const md = await readFile(srcPath, "utf-8");
  const lines = md.split("\n");
  const pageTitle = lines[0]?.replace(/^<!--\s*|\s*-->$/g, "").trim() || "";
  const pageDescription =
    lines[1]?.replace(/^<!--\s*|\s*-->$/g, "").trim() || "";
  const pageKeywords = lines[2]?.replace(/^<!--\s*|\s*-->$/g, "").trim() || "";
  const pageUrl =
    `${envVariables.DOMAIN_NAME}/docs/` +
    removeNumericPrefixes(relative.replace(".md", ".html").toLowerCase());
  const html = marked.parse(md);
  const { prev, next } = getPrevNextMD(relative);
  await writeFile(
    destPath,
    wrapHTML(
      html,
      cssAndJsFileLocation,
      pageTitle,
      pageDescription,
      pageKeywords,
      pageUrl,
      prev,
      next
    )
  );
  console.log(`Synced: ${relative}`);
}

async function processDir(src, dest) {
  const relative = path.relative(srcRoot, src);
  const destPath = getHtmlFilePath(outputDir, relative);
  await mkdir(destPath, { recursive: true });

  const items = await readdir(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const stats = await stat(srcPath);

    if (stats.isDirectory()) {
      await processDir(srcPath, path.join(dest, item));
    } else if (item.endsWith(".md")) {
      await processFile(srcPath);
    }
  }
}

async function buildAll() {
  console.log("Building documentation...");
  folderStr = await getSortedFolderStructure(inputDir);
  console.log(folderStr);
  sidebarHTML = generateSidebarHTML(folderStr);
  flattenedIndexList = flatten(folderStr);
  await processDir(inputDir, outputDir, folderStr);
  console.log("Build completed!");
}

function watch() {
  const watchPath = `${inputDir.replace(/\\/g, "/")}`;
  console.log("Watching for file changes in", watchPath);

  const watcher = chokidar.watch(watchPath, {
    ignoreInitial: true,
  });

  watcher.on("add", async (file) => {
    try {
      buildAll();
    } catch (err) {
      console.error("Error processing added file:", err);
    }
  });

  watcher.on("change", async (file) => {
    try {
      folderStr = await getSortedFolderStructure(inputDir);
      sidebarHTML = generateSidebarHTML(folderStr);
      flattenedIndexList = flatten(folderStr);
      await processFile(file);
    } catch (err) {
      console.error("Error processing changed file:", err);
    }
  });
  watcher.on("unlink", async (file) => {
    try {
      buildAll();
      const relative = path.relative(inputDir, file).toLowerCase();
      const htmlPath = getHtmlFilePath(outputDir, relative);
      await fs.promises.unlink(htmlPath);
      console.log(`❌ Removed: ${relative}`);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("HTML file already removed or doesn't exist.");
      } else {
        console.error("Error deleting HTML file:", err);
      }
    }
  });

  watcher.on("error", (err) => console.error("Watcher error:", err));
}

if (process.argv.includes("--watch")) {
  buildAll().then(watch);
} else {
  buildAll();
}

function flatten(struct) {
  const list = [];

  function walk(obj) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "string") {
        list.push(value);
      } else {
        walk(value);
      }
    }
  }
  walk(struct);
  return list;
}

function getPrevNextMD(mdPath) {
  const targetPath =
    `/cg-docs/docs/` +
    removeNumericPrefixes(mdPath).replace(".md", ".html").toLowerCase();
  console.log(targetPath);
  const list = flattenedIndexList;
  const index = list.indexOf(targetPath);
  console.log("============", index);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}
