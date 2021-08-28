import { getPermutationsWithoutDups } from './v1';

const tests: string[] = [
	'',
	'a',
	'ab',
	'abc',
	'abcd',
	'abcdefg'
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const permutations = getPermutationsWithoutDups(test);
	console.log(`${test} -----> [${permutations.join(', ')}]`);
}
