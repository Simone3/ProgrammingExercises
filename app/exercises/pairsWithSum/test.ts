import { pairsWithSum } from './v1';

console.log('\n\n**********************\n\n');

const tests = [
	{ array: [ ], sum: 5 },
	{ array: [ 2, 4, 3, 7 ], sum: 5 },
	{ array: [ 1, 3, -6, 7, 11, 1, 2 ], sum: 5 },
	{ array: [ 1, 1, 1, 4, 1, 1, 1, 4, 1 ], sum: 5 },
	{ array: [ 0, 0, 0, 0, 0, 0, 0 ], sum: 0 },
	{ array: [ 1, 2, 3, 4, 5, 6, 7 ], sum: 0 }
];

for(const test of tests) {

	console.log(`[ ${test.array.join(', ')} ] with sum ${test.sum} -> [ ${pairsWithSum(test.array, test.sum).map((indices) => {
		return `[ ${indices.join(', ')} ]`;
	}).join(', ')} ]`);
}

