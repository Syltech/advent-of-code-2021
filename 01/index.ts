import { parseInput } from '../utils';

let input = parseInput('./01/input.txt');

function isIncreasing(a: number, b: number) {
    return a < b;
}

function countIncrease(input: string[] | number[]): number {
    let increases = 0;
    for (let i = 0; i < input.length - 1; i++) {
        const current = +input[i];
        const next = +input[i + 1];
        increases += isIncreasing(current, next) ? 1 : 0;
    }
    return increases;
}

console.log("PART 1");
console.log(countIncrease(input));

function countIncreaseSliding(input: string[]): number {
    let slidingArray = [];
    for (let i = 0; i < input.length - 3; i++) {
        slidingArray.push(
            +input[i] +
            +input[i + 1] +
            +input[i + 2]
        )
    }
    return countIncrease(slidingArray);
}

console.log("PART 2");
console.log(countIncreaseSliding(input));