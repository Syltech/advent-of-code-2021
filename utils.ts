import { createReadStream } from 'fs';
import { createInterface } from 'readline';
export async function parseInput(filePath: string): Promise<string[]> {
  let output: string[] = [];
  const fileStream = createReadStream(filePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    output.push(line);
  }

  return output;
}
