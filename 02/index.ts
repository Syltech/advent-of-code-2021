import { parseInput } from '../utils';


function moveSubmarine(input: string[]): { x: number, y: number } {
    let coordinates = { x: 0, y: 0 }
    for (let move of input) {
        if (move.length === 0) break;
        const [direction, value] = move.split(' ');
        if (direction === 'forward') {
            coordinates.x += +value;
        } else {
            coordinates.y += (direction === 'down') ? +value : -value;
        }
    }
    return coordinates;
}




function moveSubmarine2(input: string[]): { x: number, y: number, aim: number } {
    let coordinates = { x: 0, y: 0, aim: 0 }
    for (let move of input) {
        if (move.length === 0) break;
        const [direction, value] = move.split(' ');
        if (direction === 'forward') {
            coordinates.x += +value;
            coordinates.y += +value * coordinates.aim;
        } else {
            coordinates.aim += (direction === 'down') ? +value : -value;
        }
    }
    return coordinates;
}




async function main() {
    let input = await parseInput('./02/input.txt');

    let result = moveSubmarine(input);
    console.log("PART 1");
    console.log({ result, answer: result.x * result.y })

    let result2 = moveSubmarine2(input);

    console.log("PART 2");
    console.log({ result2, answer: result2.x * result2.y })
}

main();