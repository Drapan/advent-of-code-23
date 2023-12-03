import { readFileSync } from 'fs';

const inputFilePath = new URL('./input.txt', import.meta.url)
const input = readFileSync(inputFilePath, 'utf8');

const lines = input.split('\n');

const REGEX_GAME_ID = /Game\s([\d]+)/;
const REGEX_ROUNDS = /(?<round>(?<=[;:]\s).*?(?=;|$))/gm;
const REGEX_SETS = /(?<num>\d+)\s(?<color>\w+)/gm;

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14
}

let accumulator = 0;

const parseGame = (line) => {
  const game = {
    id: parseInt(line.match(REGEX_GAME_ID)[1], 10),
    rounds: []
  }

  const rounds = line.matchAll(REGEX_ROUNDS);

  for (const round of rounds) {
    // console.log(round);

    const values = {};

    const sets = round.groups.round.matchAll(REGEX_SETS);
    for (const set of sets) {
      // console.log(set);

      values[set.groups.color] = (values[set.groups.color] || 0) + parseInt(set.groups.num, 10);
    }

    game.rounds.push(values);
  }
  return game;
}

for (let i = 0; i < lines.length; i++) {
  const game = parseGame(lines[i])

  const isValid = game.rounds.every(round => {
    const red = round.red || 0;
    const green = round.green || 0;
    const blue = round.blue || 0;

    if (red > LIMITS.red || green > LIMITS.green || blue > LIMITS.blue) {
      return false;
    }
    return true;
  })

  if (isValid) {
    accumulator += game.id;
  }
}

console.log(accumulator);