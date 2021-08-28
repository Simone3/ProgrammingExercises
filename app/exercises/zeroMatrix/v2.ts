/**
 * If an element in an MxN matrix is 0, its entire row and column are set to 0.
 * Assumes the matrix to be well-formed.
 * T = O(N * M)
 * S = O(1)
 * @param matrix the input matrix
 */
export const zeroMatrixV2 = (matrix: number[][]): void => {

	if(matrix.length === 0) {

		return;
	}
	
	// Check first row and first column for 0s
	const firstRow = matrix[0];
	let firstRowHasZero = false;
	let firstColumnHasZero = false;
	for(let j = 0; j < firstRow.length; j++) {

		if(firstRow[j] === 0) {

			firstRowHasZero = true;
			break;
		}
	}
	for(let i = 0; i < matrix.length; i++) {

		if(matrix[i][0] === 0) {

			firstColumnHasZero = true;
			break;
		}
	}

	// Check other rows and columns for 0s, saving the information in the first row and first column
	for(let i = 1; i < matrix.length; i++) {

		const row = matrix[i];

		for(let j = 1; j < row.length; j++) {

			if(row[j] === 0) {

				matrix[i][0] = 0;
				firstRow[j] = 0;
			}
		}
	}

	// Set all marked rows and columns to 0
	for(let i = 1; i < matrix.length; i++) {

		const row = matrix[i];
		const isZeroRow = row[0] === 0;
		for(let j = 1; j < row.length; j++) {

			if(isZeroRow || firstRow[j] === 0) {

				row[j] = 0;
			}
		}
	}

	// Nullify first row and first column if necessary
	if(firstRowHasZero) {

		for(let j = 0; j < firstRow.length; j++) {

			firstRow[j] = 0;
		}
	}
	if(firstColumnHasZero) {

		for(let i = 0; i < matrix.length; i++) {

			matrix[i][0] = 0;
		}
	}
};
