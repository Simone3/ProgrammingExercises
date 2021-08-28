import { getQueensCombinations } from './v1';

/**
 * Test helper to print a board
 * @param gridSize the board size
 * @param grid the board
 * @returns the string representation of the board
 */
const printBoard = (gridSize: number, grid: boolean[][]): string => {

	// Column indices
	let result = '\n    ';
	for(let c = 0; c < gridSize; c++) {

		result += ` (${c})`;
	}

	// Top border
	result += '\n    ';
	for(let c = 0; c < gridSize; c++) {

		result += '----';
	}
	result += '-';

	// Loop all rows
	for(let r = 0; r < gridSize; r++) {

		// Row index
		result += `\n(${r}) |`;

		// Cell values
		for(let c = 0; c < gridSize; c++) {
		
			const isQueen = grid[r][c];

			if(isQueen) {

				result += ' * |';
			}
			else {

				result += '   |';
			}
		}

		// Row border
		result += '\n    ';
		for(let c = 0; c < gridSize; c++) {

			result += '----';
		}
		result += '-';
	}

	result += '\n';

	return result;
};

const tests: number[] = [
	8
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const combinations = getQueensCombinations(test);
	console.log(`\n\n############################ ${test}`);
	for(const combination of combinations) {

		console.log(printBoard(test, combination));
	}
}
