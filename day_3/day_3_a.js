import { readFileSync } from 'fs';

const inputFilePath = new URL('./input.txt', import.meta.url)
const input = readFileSync(inputFilePath, 'utf8');

const data = [[]];

let y = 0;
for (const character of input) {
  if (character === '\n') {
    y++;
    data.push([]);
    continue;
  }

  data[y].push(character);
}

const sizeX = data[0].length;
const sizeY = data.length;

const characterIsDigit = (character) => {
  return character >= '0' && character <= '9';
}

const sample = (x, y) => {
  if (x < 0 || x >= sizeX) {
    return false;
  } else if (y < 0 || y >= sizeY) {
    return false;
  }

  const character = data[y][x];

  if (characterIsDigit(character)) {
    return false;
  }

  return character !== '.';
}

const sampleNumber = (xStart, length, y) => {
  const samplePoints = [];

  samplePoints.push([xStart - 1, y - 1]);
  samplePoints.push([xStart - 1, y]);
  samplePoints.push([xStart - 1, y + 1]);

  for (let x = 0; x < length; x++) {
    samplePoints.push([xStart + x, y - 1]);
    samplePoints.push([xStart + x, y + 1]);
  }

  samplePoints.push([xStart + length, y - 1]);
  samplePoints.push([xStart + length, y]);
  samplePoints.push([xStart + length, y + 1]);

  return samplePoints.some(([x, y]) => sample(x, y));
}

let accumulator = 0;

for (let y = 0; y < sizeY; y++) {
  let currentNumberIndexStart = -1;
  let currentNumber = [];
  for (let x = 0; x < sizeX; x++) {
    const character = data[y][x];

    if (characterIsDigit(character)) {
      if (currentNumberIndexStart === -1) {
        currentNumberIndexStart = x;
      }

      currentNumber.push(character);
    }

    // If we're at end of line or we're not in a number anymore
    if ((x === sizeX - 1 || !characterIsDigit(character)) && currentNumberIndexStart !== -1) {
      const parsedNumber = parseInt(currentNumber.join(''), 10);

      if (sampleNumber(currentNumberIndexStart, currentNumber.length, y)) {
        accumulator += parsedNumber
      }

      currentNumberIndexStart = -1;
      currentNumber = [];
    }
  }
}

console.log(accumulator);