import { randomIntegerArray } from '../../helpers/utils';
import { shortestSuperSequenceV1 } from './v1';
import { shortestSuperSequenceV2 } from './v2';
import { shortestSuperSequenceV3 } from './v3';

const tests = [
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 6, 3 ] },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 5, 8, 3 ] },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 1, 8 ] },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 4, 8, 1, 6 ] },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 5, 3, 4, 2, 8, 1, 6, 7 ] },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 9 ] },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 9, 10, 11 ] },
	{ array: [ 1, 2, 3, 4, 5, 6, 7, 8 ], searchArray: [ 2, 9, 10, 11 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1, 5 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1, 9 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 5, 9 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1, 5, 9 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1, 5, 9, 7 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1, 5, 9, 0 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1, 5, 9, 7, 0 ] },
	{ array: [ 7, 5, 9, 0, 2, 1, 3, 5, 7, 9, 1, 1, 5, 8, 8, 9, 7 ], searchArray: [ 1, 5, 24, 9 ] },
	{ array: [ 1, 1, 1, 2, 1, 1, 1, 3 ], searchArray: [ 1 ] },
	{ array: [ 1, 1, 1, 2, 1, 1, 1, 3 ], searchArray: [ 3 ] },
	{ array: [ 1, 1, 1, 2, 1, 1, 1, 3 ], searchArray: [ 1, 3 ] },
	{ array: [ 1, 1, 1, 2, 1, 1, 1, 3 ], searchArray: [ 2, 3 ] },
	{ array: [ 1, 1, 1, 2, 1, 1, 1, 3 ], searchArray: [ 2, 1 ] },
	{ array: [ 1, 1, 1, 2, 1, 1, 1, 3 ], searchArray: [ 2, 1, 3 ] },
	{ array: [ 1, 2, 2, 2, 1, 1, 3, 1, 1 ], searchArray: [ 3, 2 ] },
	{ array: [ 1, 2, 1, 1, 1, 1, 3, 2, 1 ], searchArray: [ 3, 1, 2 ] },
	{ array: randomIntegerArray(10, 1, 8), searchArray: [ 3, 1, 4, 2 ] },
	{ array: randomIntegerArray(50, 1, 8), searchArray: [ 3, 1, 4, 2 ] },
	{ array: randomIntegerArray(10, 1, 4), searchArray: [ 3, 1, 4, 2 ] },
	{ array: randomIntegerArray(50, 1, 4), searchArray: [ 3, 1, 4, 2 ] },
	{ array: randomIntegerArray(10, 1, 20), searchArray: [ 3, 1, 4, 2 ] },
	{ array: randomIntegerArray(50, 1, 20), searchArray: [ 3, 1, 4, 2 ] }
];

const resultToString = (testArray: number[], result: [ number, number ] | undefined): string => {

	return `${result ? `${result[0]}-${result[1]}, i.e. [ ${testArray.slice(result[0], result[1] + 1).join(', ')} ]` : '/'}`;
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const resultV1 = shortestSuperSequenceV1(test.array, test.searchArray);
	const resultV2 = shortestSuperSequenceV2(test.array, test.searchArray);
	const resultV3 = shortestSuperSequenceV3(test.array, test.searchArray);

	console.log(`\n[ ${test.searchArray.join(', ')} ] in [ ${test.array.join(', ')} ] --->\n    V1 = ${resultToString(test.array, resultV1)}\n    V2 = ${resultToString(test.array, resultV2)}\n    V3 = ${resultToString(test.array, resultV3)}`);

	const checkResultV1 = resultV1 ? resultV1 : [];
	const checkResultV2 = resultV2 ? resultV2 : [];
	const checkResultV3 = resultV3 ? resultV3 : [];

	if(checkResultV1.join('|') !== checkResultV2.join('|') || checkResultV1.join('|') !== checkResultV3.join('|')) {

		throw Error('Results are different!');
	}
}
