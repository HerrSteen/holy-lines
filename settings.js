
function getSettings(cmds) {
  const s = {
    verbose: false
  };
  
  cmds.forEach((cmd) => {
    if (cmd === "-v") {
      s.verbose = true;
    }
  });

  return s;
}

module.exports = getSettings;
