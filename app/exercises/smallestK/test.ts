import { randomIntegerArray } from '../../helpers/utils';
import { getSmallestV1 } from './v1';
import { getSmallestV2 } from './v2';
import { getSmallestV3 } from './v3';
import { getSmallestV4 } from './v4';
import { getSmallestV5 } from './v5';

const tests = [
	{ array: [ 3 ], count: 1 },
	{ array: [ 7, 3 ], count: 1 },
	{ array: [ 7, 3 ], count: 2 },
	{ array: [ -4, -400, -3 ], count: 1 },
	{ array: [ -4, -400, -3 ], count: 2 },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], count: 3 },
	{ array: [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ], count: 3 },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], count: 1 },
	{ array: [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ], count: 1 },
	{ array: [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ], count: 3 },
	{ array: [ 2, 1, 1, 0, 1, 3, 1, 0, 1 ], count: 3 },
	{ array: [ 1, 0, 2, 0, 1, 1, 3, 0, 1 ], count: 3 },
	{ array: [ 1, 0, 3, 0, 1, 1, 0, 0, 2 ], count: 3 },
	{ array: [ 3, 2, 1, 4, 5, 6, 1, 8, 1 ], count: 3 },
	{ array: [ 78, 100, 32, 30, -90, 85, -3, -85, 81, -58 ], count: 3 },
	{ array: randomIntegerArray(10, -100, 100), count: 3 },
	{ array: randomIntegerArray(10, -100, 100), count: 8 },
	{ array: randomIntegerArray(10, 0, 10), count: 1 },
	{ array: randomIntegerArray(10, 0, 10), count: 3 },
	{ array: randomIntegerArray(10, 0, 10), count: 5 },
	{ array: randomIntegerArray(10, 0, 10), count: 9 }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const resultV1 = getSmallestV1(test.array, test.count);
	const resultV2 = getSmallestV2(test.array, test.count);
	const resultV3 = getSmallestV3(test.array, test.count);
	const resultV4 = getSmallestV4(test.array, test.count);
	const resultV5 = getSmallestV5(test.array, test.count);

	console.log(`smallest ${test.count} of [ ${test.array.join(', ')} ] ---> V1 = ${resultV1.join(', ')} | V2 = ${resultV2.join(', ')} | V3 = ${resultV3.join(', ')} | V4 = ${resultV4.join(', ')} | V5 = ${resultV5.join(', ')}`);

	if(resultV1.sort().toString() !== resultV2.sort().toString() || resultV1.sort().toString() !== resultV3.sort().toString() || resultV1.sort().toString() !== resultV4.sort().toString() || resultV1.sort().toString() !== resultV5.sort().toString()) {

		throw Error('Results are different!');
	}
}
