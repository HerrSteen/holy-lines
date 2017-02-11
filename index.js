"use strict";

const fs = require("fs");
const getSettings = require("./settings");

const settings = getSettings(process.argv);
const list = getCatalog(process.env.PWD);

while(list.folders.length) {
  list.folders.forEach((folder, index) => {
    const res = getCatalog(folder);
    list.files = list.files.concat(res.files);
    list.folders = list.folders.concat(res.folders);
    list.folders.splice(index, 1);
  });
}

const files = list.files;
console.log("Holy lines: ", countLines(files, settings.verbose));

function countLines(files, verbose) {
  let lineCount = 0;

  files.forEach((file) => {
    var data = fs.readFileSync(file);
    var res = data.toString().split("\n").length;
    lineCount += res;
    if (verbose) console.log(`${file} : ${res}`);
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
    const f = `${dir}/${file}`;
    if (fs.lstatSync(f).isDirectory()) {
      r.folders.push(f);
    } else {
      r.files.push(f);
    }
  });

  return r;
}
