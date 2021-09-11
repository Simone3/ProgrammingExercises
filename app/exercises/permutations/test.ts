import { permutations } from '../../helpers/utils';

const tests = [
	[],
	[ 1 ],
	[ 1, 2 ],
	[ 1, 2, 3 ],
	[ 1, 1 ],
	[ 1, 1, 2 ],
	[ 1, 2, 1 ],
	[ 2, 1, 1 ],
	[ 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 2 ],
	[ 1, 2, 1, 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 1 ],
	[ 1, 2, 3, 2, 4 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const testString = `[ ${test.join(', ')} ]`;

	const result = `[ ${permutations([ ...test ]).map((permutation) => {
		return permutation.join(', ');
	}).join(' ], [ ')} ]`;

	console.log(`${testString} -> ${result}`);
}
