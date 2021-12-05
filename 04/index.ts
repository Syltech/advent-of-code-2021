import { type } from 'os';
import { parseInput } from '../utils';
const filePath = './04/input.txt';

function buildCleanDataSet(input: string[]): DataSet {

    let drawnNumbers = input[0].split(',').map(num => +num);
    let boards: Board[] = []

    let buffer: string[] = [];
    for (let i = 2; i < input.length; i++) {
        if (input[i].length > 2) {
            buffer.push(input[i]);
            continue;
        }
        boards.push(new Board(buffer));
        buffer = [];
    }
    boards.push(new Board(buffer));
    buffer = [];

    return {
        drawnNumbers,
        boards
    };
}


interface DataSet {
    drawnNumbers: number[];
    boards: Board[];
}

class Board {
    private values: number[][] = [];
    private rows: number;
    private cols: number;

    constructor(input: string[]) {
        for (let line of input) {
            const lineValues = line.split(' ').filter(val => val !== '').map(val => +val);
            this.values.push(lineValues)
        }
        this.rows = this.values.length;
        this.cols = this.values[0].length;
    }

    checkValidation(drawnNumbers: number[]): boolean {
        const validationGrid = this.getValidationGrid(drawnNumbers);

        // Row validation
        for (let i = 0; i < this.rows; i++) {
            if (this.isValid(validationGrid[i])) {
                return true;
            }
        }

        // Col validation
        for (let i = 0; i < this.cols; i++) {
            let states = validationGrid.map(row => row[i]);
            if (this.isValid(states)) {
                return true;
            }

        }
        return false;

    }

    public getSumOfUnmarked(drawnNumbers: number[]): number {
        const validationGrid = this.getValidationGrid(drawnNumbers);
        let sum = 0;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (!validationGrid[row][col]) {
                    sum += this.values[row][col];
                }
            }
        }
        return sum;
    }

    private isValid(states: boolean[]): boolean {
        return states.reduce((output, state) => {
            return output && state;
        }, true)
    }

    private getValidationGrid(drawnNumbers: number[]): boolean[][] {
        let validationGrid: boolean[][] = [];
        for (let line of this.values) {
            validationGrid.push(
                line.map(num => drawnNumbers.includes(num)
                )
            )
        }
        return validationGrid;
    }

}


async function main() {
    let input = await parseInput(filePath);
    const { drawnNumbers, boards } = buildCleanDataSet(input);

    // PARTIE 1
    let draw: number[] = [];
    let lastDraw = 0;
    let winningBoard: Board | undefined = undefined;
    for (let drawnNumber of drawnNumbers) {
        draw.push(drawnNumber);
        lastDraw = drawnNumber;
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].checkValidation(draw)) {
                winningBoard = boards[i];
                break;
            }
        }
        if (winningBoard)
            break;
    }
    if (!winningBoard) return
    console.log(winningBoard);
    console.log(winningBoard.getSumOfUnmarked(draw) * lastDraw);


    // PART 2

    draw = [];
    lastDraw = 0;
    let competitingBoards = [...boards];
    let winningBoards: Board[] = [];
    for (let drawnNumber of drawnNumbers) {
        draw.push(drawnNumber);
        lastDraw = drawnNumber;
        for (let board of competitingBoards) {
            if (board.checkValidation(draw)) {
                winningBoards.push(board);
                competitingBoards = competitingBoards.filter(b => b !== board);
            }
        }
        if (competitingBoards.length === 0)
            break;
    }
    console.log(winningBoards.slice(-1));
    console.log(lastDraw);
    console.log(winningBoards.slice(-1)[0].getSumOfUnmarked(draw) * lastDraw);

}

main();