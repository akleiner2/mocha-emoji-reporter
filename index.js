const mocha = require('mocha');
const chalk = require('chalk');

const pass = `✅`;
const error = `❌`;

const Base = mocha.reporters.Base;

function EmojiReporter(runner) {
  Base.call(this, runner);
  let passes = 0;
  let failures = 0;
  let currentIndentation = 0;
  const total = runner.total;

  const indent = () => {
    return new Array(currentIndentation).join('    ');
  };

  runner.on('suite', (suite) => {
    currentIndentation++;
    console.log(`${indent()} ${chalk.bold.inverse(suite.title)} (${suite.file})`);
  });

  runner.on('suite end', (suite) => {
    console.log();
    currentIndentation--;
  })

  runner.on('test', () => {
    currentIndentation++;
  });

  runner.on('test end', () => {
    currentIndentation--;
  })

  runner.on('pass', (test) => {
    passes++;
    console.log(`${indent()} ${chalk.green.bold(`Test passed ${pass} `)} ${test.fullTitle()}`);
  });

  runner.on('fail', (test, err) => {
    failures++;
    console.log(`${indent()} ${chalk.red.bold(`Test failed ${error} `)} ${test.fullTitle()} -- error: ${err.message}`);
  });

  runner.on('end', () => {
    if (passes === total) {
      console.log (`${chalk.green.bold(`All ${total} test cases passing`)}`);
    } else {
      console.log(`${chalk.red.bold(`Total test cases passing: ${passes}/${total}`)}`);
    }
    process.exit(failures);
  });
}

module.exports = EmojiReporter;
