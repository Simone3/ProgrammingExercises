import { randomString, randomStringArray } from '../../helpers/utils';
import { multiSearchV1 } from './v1';
import { multiSearchV2 } from './v2';

const tests = [
	{ string: '', searchStrings: [] },
	{ string: 'abc', searchStrings: [] },
	{ string: '', searchStrings: [ 'a', 'b' ] },
	{ string: 'abc', searchStrings: [ 'a', 'd', 'b', 'c' ] },
	{ string: 'abcdefghijklmnopqrstuvwxyz', searchStrings: [ 'd', 'de', 'def', 'defg', 'abcdefghijklmnopqrstuvwxyz', 'bcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxy', 'mnop', 'monp', 'abcdefghijkxlmnopqrstuvwxy', 'abcdefghijklmnopqrtuvwxy', 'xyz' ] },
	{ string: 'abcdefghijklmnopqrstuvwxyz', searchStrings: [ 'u', '1', 'pqrst1', '', 'xyz', 'abc' ] },
	{ string: 'baaabaaaa', searchStrings: [ 'a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaa', 'aaa', 'aa', 'a' ] },
	{ string: randomString(10, 'abcde'), searchStrings: randomStringArray(20, 1, 9, 'abcde') },
	{ string: randomString(100, 'abcde'), searchStrings: randomStringArray(5, 1, 10, 'abcde') },
	{ string: randomString(20, 'abc'), searchStrings: randomStringArray(50, 5, 10, 'abc') }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const resultV1 = multiSearchV1(test.string, test.searchStrings);
	const resultV2 = multiSearchV2(test.string, test.searchStrings);

	console.log(`\n[ ${test.searchStrings.join(', ')} ] in ${test.string} --->\n    V1 = ${resultV1.join(', ')}\n    V2 = ${resultV2.join(', ')}`);

	if(resultV1.join('|') !== resultV2.join('|')) {

		throw Error('Results are different');
	}
}
