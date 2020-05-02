"use strict";

var { exec, series } = require('./command');

// execute a single shell command
exec('node --version', (err) => {
  if (err) {
    console.error(err);
  }

  console.log('executed one command \n');
});

// execute multiple commands in series
series([
  'node process/http',
  'node process/a',
  // 'node process/error',
  'node process/b',
  'node process/c',
  'node --version',
], (err) => {
  if (err) {
    console.log(err);
  }

  console.log('executed many commands in a row \n');
});