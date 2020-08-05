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

const tests: number[][][] = [

	[],

	[
		[ 1 ]
	],

	[
		[ 0 ]
	],

	[
		[ 1, 2, 3 ]
	],

	[
		[ 1, 0, 3 ]
	],

	[
		[ 0, 2, 3 ]
	],

	[
		[ 1 ],
		[ 2 ],
		[ 3 ]
	],

	[
		[ 1 ],
		[ 0 ],
		[ 3 ]
	],

	[
		[ 0 ],
		[ 2 ],
		[ 3 ]
	],

	[
		[ 1, 2 ],
		[ 3, 4 ]
	],

	[
		[ 0, 2 ],
		[ 3, 4 ]
	],

	[
		[ 1, 2 ],
		[ 3, 0 ]
	],

	[
		[ 1, 0 ],
		[ 0, 4 ]
	],

	[
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	],

	[
		[ 1, 0, 3, 4, 5, 6, 0, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 0, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 0 ]
	],

	[
		[ 0, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 0, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 0 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 0 ]
	],

	[
		[ 0, 0, 0, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 0, 8, 0 ],
		[ 1, 2, 3, 4, 5, 6, 7, 0, 9 ],
		[ 1, 2, 3, 0, 0, 0, 7, 8, 9 ]
	],

	[
		[ 0, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		[ 1, 2, 3, 4, 5, 6, 7, 8, 0 ]
	],

	[
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
	]
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

for(const test of tests) {

	console.log(`${toString(test)}`);
	console.log(' ----> \n');
	zeroMatrixV2(test);
	console.log(`${toString(test)}`);
	console.log('\n*******************\n');
}
