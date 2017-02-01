const _ = require('lodash');
const path = require('path');
const Q = require('q');

const readline = require('readline');
const fs = require('fs');

let words = [];
let initialised = false;

function internalSearch(test, testIndex, inputWords, currentInputWord, currentInputWordIndex) {
  const endOfWord = testIndex >= test.length;
  const endOfInput = inputWords.length === 0;

  if (endOfWord && endOfInput) {
    return true;
  }

  if (endOfWord) {
    return false;
  }

  // if any input words match try them;
  const matchingInputWord = _.find(inputWords, word => word.toLowerCase()[0] === test[testIndex]);

  if (matchingInputWord) {
    const result = internalSearch(
      test,
      testIndex + 1,
      _.without(inputWords, matchingInputWord),
      matchingInputWord,
      1);

    if (result) {
      return true;
    }
  } else if (currentInputWord) {
    if (test.toLowerCase()[testIndex] === currentInputWord[currentInputWordIndex]) {
      if (currentInputWordIndex >= test.length) {
        return true;
      }

      return internalSearch(
        test,
        testIndex + 1,
        inputWords,
        currentInputWord,
        currentInputWordIndex + 1);
    }
  }

  return false;
}

function loadDictionary() {
  const deferred = Q.defer();

  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'words.txt')),
  });

  rl.on('line', (line) => {
    words.push(line);
  });

  rl.on('close', () => {
    initialised = true;
    deferred.resolve();
  });

  return deferred.promise;
}

function init(wordsInput) {
  words = wordsInput;
}

function search(input) {
  return Q.fcall(() => {
    if (!initialised) {
      return loadDictionary();
    }
    return Q();
  }).then(() => words.filter(word => internalSearch(word, 0, input, null)));
}

module.exports = {
  search,
  init,
};
