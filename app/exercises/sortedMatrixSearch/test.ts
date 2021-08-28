import { sortedMatrixSearchV1 } from './v1';
import { sortedMatrixSearchV2 } from './v2';

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
	console.log(`-----> V2 = ${sortedMatrixSearchV2(test.matrix, test.element)}`);
	console.log('\n****\n');
}
