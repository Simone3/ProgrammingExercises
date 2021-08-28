import { compressString } from './v1';

const tests: string[] = [
	'',
	'a',
	'ab',
	'abc',
	'aba',
	'aa',
	'aaa',
	'aaaaaaaaa',
	'aabaa',
	'baab',
	'aaaaaaaaaaaaaaaaaaab',
	'baaaaaaaaaaaaaaaaaaa',
	'baaaaaaabb',
	'ababababbaaab'
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test} -> ${compressString(test)}`);
}
