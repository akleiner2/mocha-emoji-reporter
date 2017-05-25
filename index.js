const mocha = require('mocha');
const chalk = require('chalk');

const pass = `✅`;
const error = `❌`;

function EmojiReporter(runner) {
  mocha.reporters.Base.call(this, runner);
  let passes = 0;
  let failures = 0;

  runner.on('pass', function(test){
    passes++;
    console.log(`Test passed ${pass}: %s`, test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    console.log(`Test failed ${error}: %s -- error: %s`, test.fullTitle(), err.message);
  });

  runner.on('end', function(){
    console.log('end: %d/%d', passes, passes + failures);
    process.exit(failures);
  });
}

module.exports = EmojiReporter;
