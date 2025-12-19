import { readdir, stat } from "fs/promises";
import path from "path";
import { removeNumericPrefixes } from "./utils.js";

function formatName(name) {
  name = removeNumericPrefixes(name);
  console.log("-----------", name);
  return name
    .replace(/\.md$/, "")
    .replace(/(^\w|-\w)/g, (m) => m.replace("-", " ").toUpperCase());
}
const mdDocsBuilderDir = path.resolve("./");
async function getSortedFolderStructure(dir) {
  const items = await readdir(dir);
  const entries = [];

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = await stat(fullPath);
    const isMD = item.endsWith(".md");

    if (stats.isDirectory()) {
      entries.push({
        key: formatName(item),
        type: "folder",
        created: parseFloat(item.substring(0, item.indexOf("-"))),
        children: await getSortedFolderStructure(fullPath),
      });
    } else if (isMD) {
      const relative = path.relative(mdDocsBuilderDir, fullPath);
      const processedPath =
        `/cg-docs/` +
        removeNumericPrefixes(relative.replace(/\.md$/, ".html").toLowerCase());

      entries.push({
        key: formatName(item),
        type: "file",
        created: parseFloat(item.substring(0, item.indexOf("-"))),
        path: processedPath,
      });
    }
  }

  entries.sort((a, b) => a.created - b.created);

  const result = {};
  for (const entry of entries) {
    result[entry.key] = entry.type === "folder" ? entry.children : entry.path;
  }
  return result;
}

export default getSortedFolderStructure;
