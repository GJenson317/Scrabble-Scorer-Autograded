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


// simple score
function simpleScorer(word) {
   return word.length;
 }

// vowelBonusScorer;
function vowelBonusScorer(word) {
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   let score = 0;
   for (const letter of word.toUpperCase()) {
     if (vowels.includes(letter)) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
 }

let newPointStructure;

let scrabbleScorer;

const scoringAlgorithms = [
   {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
 },
 {
   name: "Bonus Vowels",
   description: "Vowels are worth 3 points, consonants are worth 1 point.",
   scorerFunction: vowelBonusScorer
 },
 {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: oldScrabbleScorer
 }];

 // Function to prompt the user to enter a word
function initialPrompt() {
   console.log("Let's play some Scrabble!");
   const word = input.question("Enter a word to score: ");
   return word;
}
function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   const choice = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[choice];
 }
function transform() {};
// task 4

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
