const expect = require("chai").expect;

const _log = console.log;
process.env.PWD = `${process.env.PWD}/test/folder`;

describe("Holy Lines", () => {
  const pushedLogs = [];
  const logsv = [
    "Holy lines: 40"
  ];

  it ("should log all files when -v param is set", () => {
    console.log  = (...args) => {
      pushedLogs.push(...args);
    };

    require("../index");

    console.log = _log;

    expect(pushedLogs).to.eql(logsv);
  });
});

describe("Holy Lines with params", () => {
  const pushedLogs = [];
  const logsv = [
    "file-1a.txt: 7",
    "file-2a.txt: 22",
    "b/file-1b.txt: 11",
    "Holy lines: 40"
  ];

  before(() => {
    delete require.cache[require.resolve('../index')]
    process.argv.push("-v");
  });

  it ("should log all files when -v param is set", () => {
    console.log  = (...args) => {
      pushedLogs.push(...args);
    };

    require("../index");

    console.log = _log;

    expect(pushedLogs).to.eql(logsv);
  });
});
