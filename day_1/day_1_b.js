import { readFileSync } from 'fs';

const inputFilePath = new URL('./day_1.txt', import.meta.url)
const input = readFileSync(inputFilePath, 'utf8');

const lines = input.split('\n');


const NUMBERS_DIGIT = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

const NUMBERS_STRING = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
]
const NUMBERS_STRING_REV = NUMBERS_STRING.map((string) => string.split('').reverse().join(''));

const findInLine = (line, fromBack) => {
  const numberStringCurrentCount = new Array(NUMBERS_STRING.length).fill(0);
  const numbersString = fromBack ? NUMBERS_STRING_REV : NUMBERS_STRING;

  for (let characterIndex = 0; characterIndex < line.length; characterIndex++) {
    const character = fromBack ? line[line.length - 1 - characterIndex] : line[characterIndex]

    const result = findDirectionless(character, numbersString, numberStringCurrentCount);
    if (result !== undefined) {
      return result;
    }
  }

  throw new Error('🤷‍♂️');
}

const findDirectionless = (character, numbersString, numberStringCurrentCount) => {
  // basic case
  if (NUMBERS_DIGIT.includes(character)) {
    return parseInt(character, 10);
  }

  // complex case
  for (let numberIndex = 0; numberIndex < numbersString.length; numberIndex++) {
    const currentNumberStringIndex = numberStringCurrentCount[numberIndex];
    if (character === numbersString[numberIndex][currentNumberStringIndex]) {
      numberStringCurrentCount[numberIndex]++;
    } else {
      if (character === numbersString[numberIndex][0]) {
        numberStringCurrentCount[numberIndex] = 1;
      } else {
        numberStringCurrentCount[numberIndex] = 0;
      }
    }

    if (numberStringCurrentCount[numberIndex] === numbersString[numberIndex].length) {
      return numberIndex + 1;
    }
  }

  return undefined;
};

let accumulator = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const first = findInLine(line, false);
  const last = findInLine(line, true);

  accumulator += first * 10 + last;
}

console.log(accumulator);
