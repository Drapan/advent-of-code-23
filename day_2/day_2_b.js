import { readFileSync } from 'fs';

const inputFilePath = new URL('./input.txt', import.meta.url)
const input = readFileSync(inputFilePath, 'utf8');

const lines = input.split('\n');

const REGEX_GAME_ID = /Game\s([\d]+)/;
const REGEX_ROUNDS = /(?<round>(?<=[;:]\s).*?(?=;|$))/gm;
const REGEX_SETS = /(?<num>\d+)\s(?<color>\w+)/gm;

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

  const maximums = {
    red: 0,
    green: 0,
    blue: 0
  };

  game.rounds.forEach(round => {
    maximums.red = Math.max(maximums.red, round.red || 0);
    maximums.green = Math.max(maximums.green, round.green || 0);
    maximums.blue = Math.max(maximums.blue, round.blue || 0);
  })

  accumulator += maximums.red * maximums.green * maximums.blue;
}

console.log(accumulator);