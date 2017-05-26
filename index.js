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

  const indent = () => {
    return new Array(currentIndentation).join('    ');
  };

  runner.on('suite', (suite) => {
    currentIndentation++;
    console.log(`%s ${chalk.bold.inverse(suite.title)} (${suite.file})`, indent());
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
    console.log(`%s ${chalk.green.bold(`Test passed ${pass} `)} %s`, indent(), test.fullTitle());
  });

  runner.on('fail', (test, err) => {
    failures++;
    console.log(`%s ${chalk.red.bold(`Test failed ${error} `)} %s -- error: %s`, indent(), test.fullTitle(), err.message);
  });

  runner.on('end', () => {
    console.log('end: %d/%d', passes, passes + failures);
    process.exit(failures);
  });
}

module.exports = EmojiReporter;
