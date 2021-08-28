import { getParensCombinations } from './v1';

const tests: number[] = [
	0,
	1,
	2,
	3,
	4
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const combinations = getParensCombinations(test);
	console.log(`${test} -----> ${combinations.join(', ')}`);
}
