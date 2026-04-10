const fs = require("fs");
const path = require("path");

const files = process.argv.slice(2);

files.forEach((file) => {
  // Skip logger utility files
  const basename = path.basename(file).toLowerCase();
  if (basename.includes("logger") || basename.includes("log")) {
    return;
  }

  const content = fs.readFileSync(file, "utf8");
  const updatedContent = content.replace(/console\.log\(.*?\);?/g, "");
  fs.writeFileSync(file, updatedContent, "utf8");
});
