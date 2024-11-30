import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";

const buildDir = "./dist";
if (existsSync(buildDir)) {
  console.log("Build directory found, cleaning...");
  await rm(buildDir, {
    recursive: true,
  });
}
