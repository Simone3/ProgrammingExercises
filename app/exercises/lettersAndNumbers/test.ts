import { randomString } from '../../helpers/utils';
import { isNumber } from './common';
import { lettersAndNumbersV1 } from './v1';
import { lettersAndNumbersV3 } from './v3';

const tests = [
	'',
	'0',
	'a',
	'000000',
	'aaaa',
	'0a',
	'a0',
	'a0a',
	'aa0',
	'0aa',
	'0a0',
	'a00',
	'00a',
	'0a0a0a0a0a0a0a',
	'0a0a0a0a0a0a0',
	'a0a0a0a0a0a0a',
	'00000aaaaa',
	'00000aaaa',
	'0000aaaaa',
	'aaa000aaa0a000',
	'a0a0000aa00',
	'a0aa0aa000',
	'aa000aa0aa0000aa',
	'a0aa0aa000aaa000aa0aa0000aa',
	'0aaa0aa000aaa000aa0aa0000aa',
	'0aaa0aa000aaa000aa0aa00aa00',
	'a000aaaa0a0a0a0',
	'aa000a000000a0aa000a',
	'a0a0aaaaaaa0aaa00aaaaa000',
	'Ww1TG2Yn0ZVUWV3',
	randomString(5, 'a0'),
	randomString(10, 'a0'),
	randomString(15, 'a0'),
	randomString(20, 'a0'),
	randomString(25, 'a0')
];

const checkAndFormatTestResult = (subarray: string[] | undefined): string => {

	if(subarray === undefined) {

		return '/';
	}
	else {

		let numbers = 0;
		let letters = 0;
		for(const char of subarray) {

			if(isNumber(char)) {

				numbers += 1;
			}
			else {

				letters += 1;
			}
		}

		if(numbers === letters) {

			return subarray.join('');
		}
		else {

			return `[WRONG!!!] ${subarray.join('')}`;
		}
	}
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const subarrayV1 = lettersAndNumbersV1(test.split(''));
	const resultV1 = checkAndFormatTestResult(subarrayV1);

	const subarrayV2 = lettersAndNumbersV1(test.split(''));
	const resultV2 = checkAndFormatTestResult(subarrayV2);

	const subarrayV3 = lettersAndNumbersV3(test.split(''));
	const resultV3 = checkAndFormatTestResult(subarrayV3);
	
	console.log(`${test} -> V1 = ${resultV1}, V2 = ${resultV2}, V3 = ${resultV3} ${resultV1.length === resultV2.length && resultV1.length === resultV3.length ? '' : '[DIFFERENT!!!]'}`);
}

