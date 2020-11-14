/**
 * Helper to clone a bidimensional array
 * @param matrixSize the matrix size
 * @param matrix the matrix
 * @returns the cloned matrix
 */
const cloneMatrix = (matrixSize: number, matrix?: boolean[][]): boolean[][] => {

	const newMaxtrix: boolean[][] = [];

	for(let r = 0; r < matrixSize; r++) {

		newMaxtrix[r] = matrix && matrix[r] ? [ ...matrix[r] ] : [];
	}

	return newMaxtrix;
};

/**
 * Helper to build the matrix for cells marked as unusable for next steps
 * @param queensNumber the number of queens
 * @param rowIndex current row
 * @param columnIndex current column
 * @param previousUnusableCells previous matrix
 * @returns the new matrix
 */
const buildUnusableCells = (queensNumber: number, rowIndex: number, columnIndex: number, previousUnusableCells: boolean[][]): boolean[][] => {

	const unusableCells = cloneMatrix(queensNumber, previousUnusableCells);

	// Whole column below (r, c)
	for(let r = rowIndex + 1; r < queensNumber; r++) {

		unusableCells[r][columnIndex] = true;
	}

	// Left diagonal below (r, c)
	for(let r = rowIndex + 1, c = columnIndex - 1; r < queensNumber && c >= 0; r++, c--) {

		unusableCells[r][c] = true;
	}

	// Right diagonal below (r, c)
	for(let r = rowIndex + 1, c = columnIndex + 1; r < queensNumber && c < queensNumber; r++, c++) {

		unusableCells[r][c] = true;
	}

	return unusableCells;
};

/**
 * Recursive helper for getQueensCombinations()
 * @param queensNumber the number of queens
 * @param rowIndex current row
 * @param boardSoFar partial board
 * @param unusableCells cells marked as unusable by previous steps
 * @param combinations all combinations
 */
const getQueensCombinationsHelper = (queensNumber: number, rowIndex: number, boardSoFar: boolean[][], unusableCells: boolean[][], combinations: boolean[][][]): void => {

	const newRowIndex = rowIndex + 1;
	for(let c = 0; c < queensNumber; c++) {

		if(!unusableCells[rowIndex][c]) {

			const newColumn: boolean[] = [];
			newColumn[c] = true;

			const newBoardSoFar = cloneMatrix(queensNumber, boardSoFar);
			newBoardSoFar[rowIndex] = newColumn;

			if(newRowIndex < queensNumber) {

				const newUnusableCells = buildUnusableCells(queensNumber, rowIndex, c, unusableCells);

				getQueensCombinationsHelper(queensNumber, newRowIndex, newBoardSoFar, newUnusableCells, combinations);
			}
			else if(newRowIndex === queensNumber) {

				combinations.push(newBoardSoFar);
			}
		}
	}
};

/**
 * Returns all ways of arranging N queens on an NxN chess board so that none of them share the same row, column, or diagonal.
 * In this case, "diagonal" means all diagonals, not just the two that bisect the board.
 * T = O(N ^ 4)
 * @param queensNumber the number of queens
 * @returns all combinations
 */
export const getQueensCombinations = (queensNumber: number): boolean[][][] => {

	if(queensNumber <= 0) {

		return [];
	}
	else {

		const combinations: boolean[][][] = [];
		const unusableCells = cloneMatrix(queensNumber);
		getQueensCombinationsHelper(queensNumber, 0, [], unusableCells, combinations);
		return combinations;
	}
};

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
