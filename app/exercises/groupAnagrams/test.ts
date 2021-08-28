import { GroupAnagramsV1 } from './v1';
import { GroupAnagramsV2 } from './v2';

const tests = [
	[ '' ],
	[ 'aaaaaaa' ],
	[ '', '' ],
	[ 'abc', 'bba', 'abb', 'bab', 'cac', 'cca', 'cba' ],
	[ 'aa', 'abc', 'bb', 'a', 'c', 'cc', 'ba', 'bca', 'baa', '', 'ccb', 'b', 'aab', 'cba', 'cab', 'acb', 'caa', 'cb', 'bc', 'abc', 'ac', 'a', '', 'bac', 'aca', 'ca', 'ab', 'cca' ],
	[ 'a', 'c', 'b', 'a', 'c', 'b' ],
	[ 'abcdef', 'dabfce', 'afbced', 'ebcdef', 'abceef', 'abcdff', 'dbcddf', 'adcddf' ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const clonedTest = [ ...test ];
	const input = clonedTest.join(', ');
	const solver = new GroupAnagramsV1(clonedTest);
	solver.groupAnagrams();
	const output = clonedTest.join(', ');
	console.log(`[${input}] ---> [${output}]`);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const clonedTest = [ ...test ];
	const input = clonedTest.join(', ');
	const solver = new GroupAnagramsV2(clonedTest);
	solver.groupAnagrams();
	const output = clonedTest.join(', ');
	console.log(`[${input}] ---> [${output}]`);
}
