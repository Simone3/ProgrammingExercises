/**
 * Recursive helper for sortedMatrixSearchV1()
 * @param matrix the matrix
 * @param rowStart starting row index of the current portion
 * @param rowEnd ending row index of the current portion
 * @param columnStart starting column index of the current portion
 * @param columnEnd ending column index of the current portion
 * @param element the element to find
 * @returns row and column indices or undefined if not found
 */
const sortedMatrixSearchV1HelperV1 = (matrix: number[][], rowStart: number, rowEnd: number, columnStart: number, columnEnd: number, element: number): [ number, number ] | undefined => {

	if(rowStart > rowEnd || columnStart > columnEnd) {

		// Base case, empty matrix
		return undefined;
	}

	// Get matrix middle value
	const rowMiddle = rowStart + Math.floor((rowEnd - rowStart) / 2);
	const columnMiddle = columnStart + Math.floor((columnEnd - columnStart) / 2);
	const middleValue = matrix[rowMiddle][columnMiddle];

	if(middleValue === element) {

		// Found the element
		return [ rowMiddle, columnMiddle ];
	}
	else if(middleValue < element) {

		// Middle value is smaller: recurse on top-right, bottom-left and bottom-right submatrices (each 1/4 of the current matrix)
		return sortedMatrixSearchV1HelperV1(matrix, rowStart, rowMiddle, columnMiddle + 1, columnEnd, element) ||
			sortedMatrixSearchV1HelperV1(matrix, rowMiddle + 1, rowEnd, columnStart, columnMiddle, element) ||
			sortedMatrixSearchV1HelperV1(matrix, rowMiddle + 1, rowEnd, columnMiddle + 1, columnEnd, element);
	}
	else {

		// Middle value is bigger: recurse on top-left, top-right and bottom-left submatrices (each 1/4 of the current matrix)
		return sortedMatrixSearchV1HelperV1(matrix, rowStart, rowMiddle - 1, columnStart, columnMiddle - 1, element) ||
			sortedMatrixSearchV1HelperV1(matrix, rowStart, rowMiddle - 1, columnMiddle, columnEnd, element) ||
			sortedMatrixSearchV1HelperV1(matrix, rowMiddle, rowEnd, columnStart, columnMiddle - 1, element);
	}
};

/**
 * Finds and element an N x M matrix in which each row and each column is sorted in ascending order
 * T = O((NM) ^ (log4(3))) (Master Theorem for T(NM) = 3 * T(NM / 4))
 * S = O(log4(max(N,M))) (recursion)
 * @param matrix the matrix
 * @param element the element to find
 * @returns row and column indices or undefined if not found
 */
export const sortedMatrixSearchV1 = (matrix: number[][], element: number): [ number, number ] | undefined => {

	if(matrix.length > 0) {

		return sortedMatrixSearchV1HelperV1(matrix, 0, matrix.length - 1, 0, matrix[0].length - 1, element);
	}
};

/**
 * Helper to find in a square matrix the first value of the diagonal (ordered by definition) that is >= than the element
 * @param matrix the matrix
 * @param rowStart starting row index of the current portion
 * @param columnStart starting column index of the current portion
 * @param squareMatrixSize the size of the matrix
 * @param element the reference element
 * @returns row and column indices or undefined if not found
 */
const findGreaterOrEqualValueInDiagonalV2 = (matrix: number[][], rowStart: number, columnStart: number, squareMatrixSize: number, element: number): [ number, number ] | undefined => {

	if(squareMatrixSize <= 0) {

		// Base case, empty matrix
		return undefined;
	}

	// Find the element in the middle of the diagonal
	const rowEnd = rowStart + squareMatrixSize;
	const halfSize = Math.floor(squareMatrixSize / 2);
	const diagonalMiddleRow = rowStart + halfSize;
	const diagonalMiddleColumn = columnStart + halfSize;
	const diagonalMiddleValue = matrix[diagonalMiddleRow][diagonalMiddleColumn];

	if(diagonalMiddleValue < element) {

		// Middle value is smaller than the element, recurse on the bottom-right submatrix
		return findGreaterOrEqualValueInDiagonalV2(matrix, diagonalMiddleRow + 1, diagonalMiddleColumn + 1, rowEnd - diagonalMiddleRow, element);
	}
	else if(diagonalMiddleRow > 0 && diagonalMiddleColumn > 0 && matrix[diagonalMiddleRow - 1][diagonalMiddleColumn - 1] >= element) {

		// Middle value is >= than the element but there are previous values that are also bigger, recurse on top-left submatrix
		return findGreaterOrEqualValueInDiagonalV2(matrix, rowStart, columnStart, halfSize, diagonalMiddleRow - rowStart);
	}
	else {

		// Middle value is the first that is >= than the element
		return [ diagonalMiddleRow, diagonalMiddleColumn ];
	}
	
};

/**
 * Recursive helper for sortedMatrixSearchV2()
 * @param matrix the matrix
 * @param rowStart starting row index of the current portion
 * @param rowEnd ending row index of the current portion
 * @param columnStart starting column index of the current portion
 * @param columnEnd ending column index of the current portion
 * @param element the element to find
 * @returns row and column indices or undefined if not found
 */
const sortedMatrixSearchV1HelperV2 = (matrix: number[][], rowStart: number, rowEnd: number, columnStart: number, columnEnd: number, element: number): [ number, number ] | undefined => {

	if(rowStart > rowEnd || columnStart > columnEnd) {

		// Base case, empty matrix
		return undefined;
	}

	// Find in the matrix the first value of the diagonal (ordered by definition) that is >= than the element (if the matrix is not square, consider it so ignoring for now the rest)
	const height = rowEnd - rowStart;
	const width = columnEnd - columnStart;
	const squareMatrixSize = height > width ? width : height;
	const diagonalCoordinates = findGreaterOrEqualValueInDiagonalV2(matrix, rowStart, columnStart, squareMatrixSize, element);
	const diagonalRow = diagonalCoordinates === undefined ? rowStart + squareMatrixSize + 1 : diagonalCoordinates[0];
	const diagonalColumn = diagonalCoordinates === undefined ? columnStart + squareMatrixSize + 1 : diagonalCoordinates[1];

	// Recurse on top-right and top-left submatrices because the element can't be in the top-left (all values are smaller than the element by definition) or in the bottom-right (all values are bigger than the element by definition)
	return sortedMatrixSearchV1HelperV2(matrix, rowStart, diagonalRow - 1, diagonalColumn, columnEnd, element) ||
		sortedMatrixSearchV1HelperV2(matrix, diagonalRow, rowEnd, columnStart, diagonalColumn - 1, element);
};

/**
 * Finds and element an N x M matrix in which each row and each column is sorted in ascending order
 * T = on average O((NM) ^ (log4(2))) (Master Theorem for T(NM) = 2 * T(NM / 4) + log(sqrt(N^2 + M^2)) =~ 2 * T(NM / 4) + log(N + M) <= 2 * T(NM / 4) + log(NM))
 * S = O(log4(max(N,M))) (recursion)
 * @param matrix the matrix
 * @param element the element to find
 * @returns row and column indices or undefined if not found
 */
export const sortedMatrixSearchV2 = (matrix: number[][], element: number): [ number, number ] | undefined => {

	if(matrix.length > 0) {

		return sortedMatrixSearchV1HelperV2(matrix, 0, matrix.length - 1, 0, matrix[0].length - 1, element);
	}
};

const tests = [
	{
		matrix: [],
		element: 1
	},
	{
		matrix: [
			[ 1 ]
		],
		element: 1
	},
	{
		matrix: [
			[ 1 ]
		],
		element: 2
	},
	{
		matrix: [
			[ 1, 2, 3 ]
		],
		element: 1
	},
	{
		matrix: [
			[ 1, 2, 3 ]
		],
		element: 3
	},
	{
		matrix: [
			[ 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
			[ 19, 20, 21, 22, 23, 24, 25, 26, 27 ],
			[ 28, 29, 30, 31, 32, 33, 34, 35, 36 ]
		],
		element: 11
	},
	{
		matrix: [
			[ 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
			[ 19, 20, 21, 22, 23, 24, 25, 26, 27 ],
			[ 28, 29, 30, 31, 32, 33, 34, 35, 36 ]
		],
		element: 18
	},
	{
		matrix: [
			[ 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
			[ 19, 20, 21, 22, 23, 24, 25, 26, 27 ],
			[ 28, 29, 30, 31, 32, 33, 34, 35, 36 ]
		],
		element: 36
	},
	{
		matrix: [
			[ 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
			[ 19, 20, 21, 22, 23, 24, 25, 26, 27 ],
			[ 28, 29, 30, 31, 32, 33, 34, 35, 36 ]
		],
		element: 28
	},
	{
		matrix: [
			[ 10, 11, 12, 13, 14, 15, 16, 17, 18 ],
			[ 19, 20, 21, 22, 23, 24, 25, 26, 27 ],
			[ 28, 29, 30, 31, 32, 33, 34, 35, 36 ]
		],
		element: 37
	},
	{
		matrix: [
			[ 10, 15, 26 ],
			[ 20, 25, 36 ],
			[ 30, 35, 46 ],
			[ 40, 45, 56 ],
			[ 50, 55, 66 ],
			[ 60, 65, 76 ],
			[ 70, 75, 86 ],
			[ 80, 85, 96 ],
			[ 90, 95, 99 ]
		],
		element: 76
	},
	{
		matrix: [
			[ 10, 15, 26 ],
			[ 20, 25, 36 ],
			[ 30, 35, 46 ],
			[ 40, 45, 56 ],
			[ 50, 55, 66 ],
			[ 60, 65, 76 ],
			[ 70, 75, 86 ],
			[ 80, 85, 96 ],
			[ 90, 95, 99 ]
		],
		element: 20
	},
	{
		matrix: [
			[ 10, 15, 26 ],
			[ 20, 25, 36 ],
			[ 30, 35, 46 ],
			[ 40, 45, 56 ],
			[ 50, 55, 66 ],
			[ 60, 65, 76 ],
			[ 70, 75, 86 ],
			[ 80, 85, 96 ],
			[ 90, 95, 99 ]
		],
		element: 16
	},
	{
		matrix: [
			[ 10, 15, 26 ],
			[ 20, 25, 36 ],
			[ 30, 35, 46 ],
			[ 40, 45, 56 ],
			[ 50, 55, 66 ],
			[ 60, 65, 76 ],
			[ 70, 75, 86 ],
			[ 80, 85, 96 ],
			[ 90, 95, 99 ]
		],
		element: 91
	}
];

const toString = (matrix: number[][]): string => {

	let result = '';
	for(let i = 0; i < matrix.length; i++) {

		result += '[ ';
		for(let j = 0; j < matrix[i].length; j++) {

			result += `${matrix[i][j]} `;
		}
		result += ']\n';
	}
	return result;
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(toString(test.matrix));
	console.log(`contains ${test.element}?`);
	console.log(`\n-----> V1 = ${sortedMatrixSearchV1(test.matrix, test.element)}`);
	console.log(`-----> V2 = ${sortedMatrixSearchV1(test.matrix, test.element)}`);
	console.log('\n****\n');
}
