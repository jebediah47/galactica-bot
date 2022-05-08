import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";

const buildDir = "./dist";
if (existsSync(buildDir)) {
  console.log("Build directory already exists, cleaning...");
  rm(buildDir, {
    recursive: true,
  });
}
