import { readFileSync } from 'fs';

const inputFilePath = new URL('./day_1.txt', import.meta.url)
const input = readFileSync(inputFilePath, 'utf8');

const lines = input.split('\n');

const REGEX_FIRST = /((?<![0-9].*)[0-9])/;
const REGEX_LAST = /[0-9](?!.*[0-9])/;

const findByRegex = (line, regex) => {
  const match = line.match(regex)[0];
  return parseInt(match, 10);
};

let accumulator = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const first = findByRegex(line, REGEX_FIRST);
  const last = findByRegex(line, REGEX_LAST);

  accumulator += first * 10 + last;
}

console.log(accumulator);