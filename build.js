const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function compile() {
  try {
    await exec("tsc");
  } catch (err) {
    console.error(err);
  }
}

var buildDir = "./dist";

if (fs.existsSync(buildDir)) {
  console.log("Building bot to JavaScript");
  compile();
} else {
  console.log("Creating build directory");
  fs.mkdirSync("dist");
  console.log("Building bot to JavaScript");
  compile();
}
