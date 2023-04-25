// @ts-check

"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

/**
 * @param {string | Buffer} value
 * @returns {string}
 */
const hash = (value) => {
    return crypto.createHash("sha256").update(value).digest("hex");
}

/**
 * @param {string} file
 * @returns {string}
 */
function hashFile(file) {
    return hash(fs.readFileSync(file));
}

/**
 * @param {string} dir
 * @returns {string}
 */
function hashDir(dir) {
    return hash(
        fs
            .readdirSync(dir)
            .sort()
            .map((file) => path.join(dir, file))
            .reduce((acc, file) => acc + hashTree(file), "")
    );
}

/**
 * @param {string} dir
 * @returns {string}
 */
function hashTree(dir) {
    const stat = fs.statSync(dir);
    if (stat.isFile()) {
        return hashFile(dir);
    } else if (stat.isDirectory()) {
        return hashDir(dir);
    } else {
        throw new Error(`Unknown file type: ${dir}`);
    }
}

module.exports = hashTree;
