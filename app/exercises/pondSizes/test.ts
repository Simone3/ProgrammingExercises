import { getPondSizes } from './v1';

const tests: number[][][] = [
	[],

	[
		[ 1 ]
	],

	[
		[ 0 ]
	],

	[
		[ 1, 1, 1, 1 ]
	],

	[
		[ 1, 0, 1, 1 ]
	],

	[
		[ 1, 1, 0, 0 ]
	],

	[
		[ 0, 0, 0, 0 ]
	],

	[
		[ 1, 1, 1, 1 ],
		[ 1, 1, 1, 1 ],
		[ 1, 1, 1, 1 ]
	],

	[
		[ 1, 1, 1, 1 ],
		[ 1, 0, 1, 1 ],
		[ 1, 1, 1, 1 ]
	],

	[
		[ 1, 0, 1, 1 ],
		[ 1, 1, 1, 0 ],
		[ 0, 1, 1, 1 ]
	],

	[
		[ 0, 1, 1, 1 ],
		[ 1, 0, 1, 0 ],
		[ 1, 1, 0, 1 ]
	],

	[
		[ 0, 1, 1, 0 ],
		[ 1, 0, 0, 1 ],
		[ 1, 0, 1, 0 ]
	],

	[
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ],
		[ 0, 0, 0, 0 ]
	],

	[
		[ 0, 2, 1, 0 ],
		[ 0, 1, 0, 1 ],
		[ 1, 1, 0, 1 ],
		[ 0, 1, 0, 1 ]
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

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${toString(test)}`);
	console.log(' ----> \n');
	console.log(`[ ${getPondSizes(test).join(', ')} ]`);
	console.log('\n*******************\n');
}
