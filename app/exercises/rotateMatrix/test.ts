import { rotateMatrix } from './v1';

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
		for(let j = 0; j < matrix[i].length; j++) {

			result += `${matrix[i][j]} `;
		}
		result += ']\n';
	}
	return result;
};

const allDegrees = [ -450, -360, -270, -180, -90, 0, 90, 180, 270, 360, 450 ];
console.log('\n\n**********************\n\n');
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
