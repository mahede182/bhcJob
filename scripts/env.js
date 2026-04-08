/**
 * Pre-commit script to prevent .env files from being committed.
 */
const files = process.argv.slice(2);

// Check for any file that starts with .env (e.g., .env, .env.local, .env.production)
const envFiles = files.filter((file) => {
  const fileName = file.split("/").pop();
  return fileName.startsWith(".env");
});

if (envFiles.length > 0) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "✖ CRITICAL ERROR: .env files detected in staging area!",
  );
  console.error(
    "\x1b[31m%s\x1b[0m",
    "---------------------------------------------------",
  );
  console.error("The following files represent a security risk if committed:");
  envFiles.forEach((file) => console.error(`  - ${file}`));
  console.error(
    "\x1b[31m%s\x1b[0m",
    "---------------------------------------------------",
  );
  console.error(
    'ACTION REQUIRED: Run "git restore --staged <file>" to remove them from the commit.',
  );
  process.exit(1);
}

process.exit(0);
