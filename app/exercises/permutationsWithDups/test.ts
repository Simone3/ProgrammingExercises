import { getPermutationsWithDups } from './v1';

const tests: string[] = [
	'',
	'a',
	'ab',
	'abc',
	'abcd',
	'aaaaa',
	'aabaa',
	'caaba',
	'abcbd'
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const permutations = getPermutationsWithDups(test);
	console.log(`${test} -----> [${permutations.join(', ')}]`);
}
