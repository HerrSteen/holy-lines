#! /usr/bin/env node
"use strict";

const fs = require("fs");
const getSettings = require("./settings");

const settings = getSettings(process);
const list = getCatalog(process.env.PWD);
console.log("process.env.PWD", settings.path);

while(list.folders.length) {
  list.folders.forEach((folder, index) => {
    const res = getCatalog(folder);
    list.files = list.files.concat(res.files);
    list.folders = list.folders.concat(res.folders);
    list.folders.splice(index, 1);
  });
}

const files = list.files;
console.log("Holy lines: ", countLines(files, settings));

function countLines(files, settings) {
  let lineCount = 0;

  files.forEach((file) => {
    var data = fs.readFileSync(file);
    var res = data.toString().split("\n").length;
    lineCount += res;
    if (settings.verbose) {
      printLine(file, res, settings.path);
    }
  });

  return lineCount;
}

function getCatalog(dir) {
  const stream = fs.readdirSync(dir);
  const r = {
    files: [],
    folders: []
  };

  stream.forEach((file) => {
    if (passFilter(file)) {
      const f = `${dir}/${file}`;
      if (fs.lstatSync(f).isDirectory()) {
        r.folders.push(f);
      } else {
        r.files.push(f);
      }
    }
  });

  return r;
}

function printLine(file, lineCount, path) {
  const n = file.substr(path.length+1);
  console.log(`${n} : ${lineCount}`);


}

function passFilter(file) {
  if (file.indexOf(".") === 0) return false;
  return true;
}
