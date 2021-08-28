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
