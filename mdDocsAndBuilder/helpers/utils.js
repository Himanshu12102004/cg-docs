import path from "path";

export function removeNumericPrefixes(path) {
  return path
    .split("/")
    .map((part) => part.replace(/^\d+-/, ""))
    .join("/");
}

export function getHtmlFilePath(outputDir, relativePath) {
  return path.join(
    outputDir,
    removeNumericPrefixes(relativePath.replace(".md", ".html").toLowerCase())
  );
}
