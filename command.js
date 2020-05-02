"use strict";

const child_process = require('child_process');

function exec(cmd, cb) {
  const parts = cmd.split(/\s+/g);
  const p = child_process.spawn(parts[0], parts.slice(1), { stdio: 'inherit' });

  p.on('exit', (code) => {
    let err = null;

    if (code) {
      err = new Error('command "' + cmd + '" exited with wrong status code "' + code + '"');
      err.code = code;
      err.cmd = cmd;
    }

    if (cb) cb(err);
  });

  p.on('error', (err) => {
    if (cb) cb(err);
  });
};

function series(cmds, cb) {
  var execNext = () => {
    exec(cmds.shift(), (err) => {
      if (err) {
        cb(err);
      } else {
        if (cmds.length) execNext();
        else cb(null);
      }
    });
  };
  execNext();
}


module.exports = {
  exec,
  series,
}
