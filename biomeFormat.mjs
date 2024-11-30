// https://github.com/biomejs/biome-intellij/issues/44
import { exec } from "node:child_process";

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: bun runBiomeFormat.js <file_path>');
  process.exit(1);
}

const command = `bunx @biomejs/biome check --organize-imports-enabled=true --fix "${filePath}"`;

// Execute the command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
