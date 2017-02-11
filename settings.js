
function getSettings(process) {
  const s = {
    verbose: false,
    path: process.env.PWD
  };

  process.argv.forEach((cmd) => {
    if (cmd === "-v") {
      s.verbose = true;
    }
  });

  return s;
}

module.exports = getSettings;
