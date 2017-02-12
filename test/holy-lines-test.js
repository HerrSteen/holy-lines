const expect = require("chai").expect;
const _log = console.log;

describe("Holy Lines", () => {
  const pushedLogs = [];
  const logsv = [
    "Holy lines: 40"
  ];

  before(() => {
    process.env.PWD = `${process.env.PWD}/test/folder`;
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

describe("Holy Lines with params", () => {
  const pushedLogs = [];
  const logsv = [
    "Holy lines: 40"
  ];

  before(() => {
    delete require.cache[require.resolve('../index')]
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
