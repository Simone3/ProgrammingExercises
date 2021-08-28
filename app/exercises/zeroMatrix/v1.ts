/**
 * If an element in an MxN matrix is 0, its entire row and column are set to 0.
 * Assumes the matrix to be well-formed.
 * T = O(N * M)
 * S = O(N + M)
 * @param matrix the input matrix
 */
export const zeroMatrix = (matrix: number[][]): void => {

	// Find rows and columns with 0s (can't replace at the same time, we first need to find all ORIGINAL 0s!)
	const zeroRowsMap: {[key: number]: boolean} = {};
	const zeroColumnsMap: {[key: number]: boolean} = {};
	for(let i = 0; i < matrix.length; i++) {

		const row = matrix[i];

		for(let j = 0; j < row.length; j++) {

			if(row[j] === 0) {

				zeroRowsMap[i] = true;
				zeroColumnsMap[j] = true;
			}
		}
	}

	// Set all marked rows and columns to 0
	for(let i = 0; i < matrix.length; i++) {

		const row = matrix[i];
		const isZeroRow = zeroRowsMap[i];

		for(let j = 0; j < row.length; j++) {

			if(isZeroRow || zeroColumnsMap[j]) {

				row[j] = 0;
			}
		}
	}
};
