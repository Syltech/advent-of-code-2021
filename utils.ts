import { readFileSync } from 'fs'

export function parseInput(filePath: string): string[] {
  let input: string[] = [];
  try {
    input = readFileSync(filePath).toString().split("\n");
  } catch (e) {
    console.error(e);
  }
  return input;
}
