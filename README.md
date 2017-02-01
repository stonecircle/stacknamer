# Stack Namer

This is a very simple library that contains an algorithm to discover a "stack name" given an input of words.

## What is a stack name

The best way to describe a stack name is to give an example. We are all aware of the *LAMP* stack, which comprises of **L**inux, **A**pache, **M**ySQL and **P**HP. This works as a "stack name" because it is a **real english word** that contains at least the first letter of each of the comprising technologies. Two alternative stack names for these technologies would have been *PALM* (**P**HP **A**pache **L**inux and **M**ySQL) and *PALMy* (**P**HP **A**pache **L**inux and **My**SQL). As you can see this algorithm allows for more than one contiguous letter in the input word to be included in the output.

## Basic Usage

```js
var stacknamer = require('stack-namer');

stacknamer.search(['Linux', 'Apache', 'PHP', 'MySQL']).then(function(results) {
  console.log(results); // [ 'lamp', 'palm', 'palmy' ]
});
```

### Advanced Usage
This library comes with a built in dictionary that it will search for stack names from. If you want to initialise the library with a different dictionary you can do that using the `.init()` function as follows:

```js
var stacknamer = require('stack-namer');

stacknamer.init(['malp']); // not really a word but now this will be the only match

stacknamer.search(['Linux', 'Apache', 'PHP', 'MySQL']).then(function(results) {
  console.log(results); // [ 'malp' ]
});
```

Note: all of your dictionary words **must** be in lowercase. 
