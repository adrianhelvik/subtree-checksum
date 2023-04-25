// @ts-check

"use strict";

const hashMultiple = require("./index.js");

const args = process.argv.slice(2);

const files = []
let skip = [];

for (const arg of args) {
    if (arg.startsWith("-")) {
        if (arg.startsWith("--skip=")) {
            skip = arg.slice("--skip=".length).split(",");
        } else if (arg === "-h" || arg === "--help") {
            console.log(`Example: subtree-checksum --skip=node_modules,.git [files...]`)
        } else {
            throw Error(`Unknown option: ${arg}`);
        }
        continue;
    }
    files.push(arg);
}

if (!files.length) files.push(process.cwd());

console.log(hashMultiple(files, skip));
