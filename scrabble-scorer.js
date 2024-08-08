// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) { 
  word = word.toUpperCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        score += parseInt(pointValue);
      }
    }
  }
  return score;
}
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble! \n");
  return input.question("Please enter a word:");
}

// Simple Scorer - each letter is worth one point
function simpleScorer(word) {
  return word.length;
}

// Vowel Bonus
function vowelBonusScorer(word) {
  const vowels = "AEIOU";
  let score = 0;
  for (const letter of word.toUpperCase()) {
    score += vowels.includes(letter) ? 3 : 1;
  }
  return score;
}

function scrabbleScorer(word) {
  let score = 0;
  for (const letter of word.toLowerCase()) {
    score += newPointStructure[letter];
  }
  return score;
}
// Scoring algorithms
const scoringAlgorithms = [
  {
    name: 'Simple Score',
    description: 'Each character is worth 1 point',
    scorerFunction: simpleScorer
  },
  {
    name: 'Bonus Vowels',
    description: 'Each vowel is worth 3 points',
    scorerFunction: vowelBonusScorer
  },
  {
    name: 'Scrabble Scoring',
    description: 'Traditional Scrabble score method',
    scorerFunction: scrabbleScorer
  },
];

function scorerPrompt() {
  console.log("Which scoring system would you like to use? \n");
  for (let i = 0; i < scoringAlgorithms.length; i++) { 
  console.log(`${[i]} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }
  let userChoice = input.question("\nPlease enter 0, 1, or 2: \n");
  let userChoiceNum = Number(userChoice);
  if(isNaN(userChoiceNum) || userChoiceNum < 0 || userChoiceNum > 2) { 
  console.log("Please enter 0, 1 or 2\n");
  return scorerPrompt();
  }
  return scoringAlgorithms[userChoiceNum];
  }
// transform to new point structure
function transform(oldStructure) {
  const newPointStructure = {};
  for (const pointValue in oldStructure) {
    oldStructure[pointValue].forEach(letter => {
      newPointStructure[letter.toLowerCase()] = parseInt(pointValue);
    });
  }
  return newPointStructure;
}
const newPointStructure = transform(oldPointStructure);

function runProgram() {
  const word = initialPrompt();
  const scoringAlgorithm = scorerPrompt();
  const score = scoringAlgorithm.scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
}
runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
