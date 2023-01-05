import { randomStringArray } from '../../helpers/utils';
import { LongestWordResult } from './common';
import { longestWordV1 } from './v1';
import { longestWordV2 } from './v2';

const tests = [
	[ 'tree', 'home', 'owner', 'homeowner', 'house', 'literature' ],
	[ 'tree', 'home', 'owner', 'homeowners', 'literature', 'house', 'literature' ],
	[ 'a', 'b', 'c', 'abc', 'def', 'abcdef', 'abcdefdefabc' ],
	[ 'a', 'b', 'c', 'abc', 'def', 'abcdef', 'abcdefxdefabc' ],
	[ 'a', 'b', 'c', 'abc', 'def', 'abcdxf', 'abcdefdefaxc' ],
	[ 'abcdefghij', 'o', 'lmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdef', 'pqrstuvwxyz', 'ghijklmn' ],
	[ 'abcdefghij', 'lmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz', 'abcdef', 'pqrstuvwxyz', 'ghijklmn' ],
	[ '', 'fabcdef', 'abcdefa', 'abcdef', 'abcdefabcdef', '', 'ghijklmn' ],
	randomStringArray(10, 5, 10, 'abcdefghijklmnopqrstuvwxyz'),
	randomStringArray(10, 50, 100, 'abcdefghijklmnopqrstuvwxyz'),
	randomStringArray(100, 5, 10, 'abcdefghijklmnopqrstuvwxyz')
];

const verifyResult = (result: LongestWordResult | undefined, words: string[]): void => {

	if(result) {

		if(!result.longestWord) {

			throw Error('Wrong result: no longest word!');
		}

		if(words.length <= 2) {

			throw Error('Wrong result: too few sub-words!');
		}

		if(!words.includes(result.longestWord)) {

			throw Error('Wrong result: longest word is not in the dictionary!');
		}

		for(const subWord of result.words) {

			if(!words.includes(subWord)) {

				throw Error(`Wrong result: sub-word ${subWord} is not in the dictionary!`);
			}
		}

		if(result.longestWord !== result.words.join('')) {

			throw Error('Wrong result: sub-words do not match longest word!');
		}
	}
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const resultV1 = longestWordV1(test);
	const resultV2 = longestWordV2(test);

	console.log(`[ ${test.join(', ')} ] ---> V1 = ${resultV1 ? `${resultV1.longestWord} with [ ${resultV1.words.join(', ')} ]` : '-'} | V2 = ${resultV2 ? `${resultV2.longestWord} with [ ${resultV2.words.join(', ')} ]` : '-'}`);

	verifyResult(resultV1, test);
	verifyResult(resultV2, test);
}
