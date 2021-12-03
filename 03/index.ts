import { parseInput } from '../utils';
const filePath = './03/input.txt';

function extractMajorAndMinorBits(input: string[]): { majorBits: string, minorBits: string } {
    const sumBits = new Array(input[0].length);
    sumBits.fill(0.0);

    const reportLines = input.length;

    for (let reportLine of input) {
        reportLine.split('').forEach((bit, i) => {
            if (bit === '1') {
                sumBits[i]++;
            }
        })
    }

    let majorBits = '',
        minorBits = ''

    sumBits.forEach(sum => {
        if (sum / reportLines >= 0.5) {
            majorBits += '1';
            minorBits += '0';
        } else {
            majorBits += '0';
            minorBits += '1';
        }
    });

    return {
        majorBits,
        minorBits
    }
}

function extractLifeSupportRating(input: string[]): { o2Generator: number, co2Generator: number } {

    const iterations = input[0].length;

    let o2filteredReport = [...input];
    let o2prefix = ''

    let co2filteredReport = [...input];
    let co2prefix = ''

    for (let i = 0; i < iterations; i++) {
        if (o2filteredReport.length > 1) {
            const o2 = extractMajorAndMinorBits(o2filteredReport)
            o2prefix += o2.majorBits.slice(i, i + 1)
            o2filteredReport = o2filteredReport.filter(line => line.startsWith(o2prefix))
        }

        if (co2filteredReport.length > 1) {
            const co2bitStats = extractMajorAndMinorBits(co2filteredReport)
            co2prefix += co2bitStats.minorBits.slice(i, i + 1)
            co2filteredReport = co2filteredReport.filter(line => line.startsWith(co2prefix))
        }
    }

    return {
        o2Generator: parseInt(o2filteredReport[0], 2),
        co2Generator: parseInt(co2filteredReport[0], 2),
    };
}

function convertBitsToRates(bits: { majorBits: string, minorBits: string }): { gamma: number, epsilon: number } {
    return {
        gamma: parseInt(bits.majorBits, 2),
        epsilon: parseInt(bits.minorBits, 2)
    }
}

async function main() {
    let input = await parseInput(filePath);
    let output = convertBitsToRates(extractMajorAndMinorBits(input));

    console.log("PART 1 : ", { output }, output.gamma * output.epsilon);

    let output2 = extractLifeSupportRating(input);
    console.log("PART 2 : ", { output2 }, output2.co2Generator * output2.o2Generator);
}

main();