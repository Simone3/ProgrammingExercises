
/**
 * Helper to rotate a "square" of a matrix (top row, left column, bottom row, right column)
 * @param matrix the input matrix
 * @param degrees the rotation degrees, may be negative. Must be a multiple of 90.
 * @param start the start index (top row and right column)
 * @param end the end index (bottom row and left column)
 */
const rotateMatrixSquare = (matrix: string[][], degrees: number, start: number, end: number): void => {

	// Base condition, no more inner squares, we are done rotating in place
	if(end - start <= 0) {

		return;
	}

	// Some variables to keep track of the indexes
	const topSideI = start;
	let topSideJ = start;
	let rightSideI = start;
	const rightSideJ = end;
	const bottomSideI = end;
	let bottomSideJ = end;
	let leftSideI = end;
	const leftSideJ = start;

	// For each element of a side of the square
	for(let i = start; i < end; i++) {

		// Get current values
		const topValue = matrix[topSideI][topSideJ];
		const rightValue = matrix[rightSideI][rightSideJ];
		const bottomValue = matrix[bottomSideI][bottomSideJ];
		const leftValue = matrix[leftSideI][leftSideJ];

		// Set the values in the corresponding rotating position
		if(degrees === 90 || degrees === -270) {

			matrix[topSideI][topSideJ] = leftValue;
			matrix[rightSideI][rightSideJ] = topValue;
			matrix[bottomSideI][bottomSideJ] = rightValue;
			matrix[leftSideI][leftSideJ] = bottomValue;
		}
		else if(degrees === 180 || degrees === -180) {

			matrix[topSideI][topSideJ] = bottomValue;
			matrix[rightSideI][rightSideJ] = leftValue;
			matrix[bottomSideI][bottomSideJ] = topValue;
			matrix[leftSideI][leftSideJ] = rightValue;
		}
		else if(degrees === 270 || degrees === -90) {

			matrix[topSideI][topSideJ] = rightValue;
			matrix[rightSideI][rightSideJ] = bottomValue;
			matrix[bottomSideI][bottomSideJ] = leftValue;
			matrix[leftSideI][leftSideJ] = topValue;
		}
		else {

			throw Error(`This should never happen...! Degrees = ${degrees}`);
		}

		// Increase or decrese the row or column index depending on the square side
		topSideJ += 1;
		rightSideI += 1;
		bottomSideJ -= 1;
		leftSideI -= 1;
	}

	// Recursion on the inner square
	rotateMatrixSquare(matrix, degrees, start + 1, end - 1);
};

/**
 * Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, it rotates the image by 90 degrees (in place).
 * Assumes the matrix to be well-formed and NxN.
 * T = O(N^2)
 * S = O(1)
 * @param matrix the input matrix
 * @param degrees the rotation degrees, may be negative. Must be a multiple of 90.
 */
export const rotateMatrix = (matrix: string[][], degrees: number): void => {

	// Compute the actual rotation degrees
	const actualDegrees = degrees % 360;
	if(actualDegrees % 90 !== 0) {

		throw Error('Degrees must be multiples of 90');
	}

	// No need to do anything if degrees are 0
	if(actualDegrees === 0) {

		return;
	}

	// No need to do anything for N = 0 or N = 1
	if(matrix.length <= 1) {

		return;
	}

	// Call recursive helper starting from the outermost square of the matrix
	rotateMatrixSquare(matrix, actualDegrees, 0, matrix.length - 1);
};

const tests: string[][][] = [

	[],

	[
		[ 'a' ]
	],

	[
		[ 'a', 'b' ],
		[ 'c', 'd' ]
	],

	[
		[ 'a', 'b', 'c' ],
		[ 'd', 'e', 'f' ],
		[ 'g', 'h', 'i' ]
	],

	[
		[ 'a', 'b', 'c', 'd' ],
		[ 'e', 'f', 'g', 'h' ],
		[ 'i', 'j', 'k', 'l' ],
		[ 'm', 'n', 'o', 'p' ]
	],

	[
		[ 'a', 'b', 'c', 'd', 'e' ],
		[ 'f', 'g', 'h', 'i', 'j' ],
		[ 'k', 'l', 'm', 'n', 'o' ],
		[ 'p', 'q', 'r', 's', 't' ],
		[ 'u', 'v', 'w', 'x', 'y' ]
	]
];

const toString = (matrix: string[][]): string => {

	let result = '';
	for(let i = 0; i < matrix.length; i++) {

		result += '[ ';
		for(let j = 0; j < matrix.length; j++) {

			result += `${matrix[i][j]} `;
		}
		result += ']\n';
	}
	return result;
};

const allDegrees = [ -450, -360, -270, -180, -90, 0, 90, 180, 270, 360, 450 ];
for(const degrees of allDegrees) {

	console.log(`\n############################ ${degrees} ############################`);

	for(const test of tests) {

		const testCopy = JSON.parse(JSON.stringify(test));

		console.log(`${toString(testCopy)}`);
		console.log(' ----> \n');
		rotateMatrix(testCopy, degrees);
		console.log(`${toString(testCopy)}`);
		console.log('\n*******************\n');
	}
}
