// @ts-check

"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

/**
 * @param {string} fileName
 * @param {Buffer | string} value
 * @returns {string}
 */
const hashValue = (fileName, value) => {
    return crypto.createHash("sha256")
        .update(fileName)
        .update(value)
        .digest("hex");
};

/**
 * @param {string} dir
 * @param {string[]} skip
 * @returns {string}
 */
function hashDir(dir, skip) {
    if (skip && skip.includes(dir)) return "";
    return hashValue(
        dir,
        fs
            .readdirSync(dir)
            .sort()
            .map((file) => path.join(dir, file))
            .reduce((acc, file) => acc + hashFile(file, skip), "")
    );
}

/**
 * @param {string} file
 * @param {string[]} skip
 * @returns {string}
 */
function hashFile(file, skip) {
    if (skip && skip.includes(file)) return "";
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
        return hashDir(file, skip);
    } else {
        return hashValue(file, fs.readFileSync(file));
    }
}

/**
 * @param {string[]} files
 * @param {string[]} skip
 * @returns {string}
 */
function hashMultiple(files, skip) {
    return hashValue("root", files.map((file) => hashFile(file, skip)).join(""));
}

module.exports = hashMultiple;
