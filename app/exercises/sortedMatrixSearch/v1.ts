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
