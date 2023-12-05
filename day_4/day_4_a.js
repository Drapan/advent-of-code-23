import { readFileSync } from 'fs';

const inputFilePath = new URL('./input.txt', import.meta.url)
const input = readFileSync(inputFilePath, 'utf8');

const lines = input.split('\n');

const REGEX_PLAYED_NUMBERS = /(?<![|].*)\d+(?!\d*:)/gm;
const REGEX_WINNING_NUMBERS = /(?<=[|]\s+.*)\d+/gm;

let accumulator = 0;

for (let i = 0; i < lines.length; i++) {
  const playedNumbers = lines[i].match(REGEX_PLAYED_NUMBERS).map((number) => parseInt(number, 10));
  const winningNumbers = lines[i].match(REGEX_WINNING_NUMBERS).map((number) => parseInt(number, 10));

  let matchedNumbers = 0;
  for (const playedNumber of playedNumbers) {
    if (winningNumbers.includes(playedNumber)) {
      matchedNumbers++;
    }
  }

  if (matchedNumbers > 0) {
    accumulator += 2 ** (matchedNumbers - 1)
  }
}

console.log(accumulator);