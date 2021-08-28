import { getCoinsCombinations } from './v1';

const tests: number[] = [
	0,
	1,
	3,
	4,
	5,
	8,
	10,
	11,
	25
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const combinations = getCoinsCombinations(test);
	console.log(`\n\n####### ${test}`);
	for(const combination of combinations) {

		console.log(combination.join(' + '));
	}
}
