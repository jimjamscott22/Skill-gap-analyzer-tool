const fs = require("node:fs");
const path = require("node:path");

const testFiles = fs
  .readdirSync(__dirname)
  .filter((fileName) => fileName.endsWith(".test.js"))
  .sort();

let failures = 0;

for (const fileName of testFiles) {
  const testPath = path.join(__dirname, fileName);
  try {
    require(testPath);
    console.log(`PASS ${fileName}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${fileName}`);
    console.error(error.stack || error.message);
  }
}

if (failures > 0) {
  process.exitCode = 1;
}
