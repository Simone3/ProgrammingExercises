const majorityElementHelper = (array: number[], start: number, end: number): number[] => {

	const length = end - start + 1;
	if(length <= 2) {

		return array.slice(start, end + 1);
	}
	else {

		const split = start + Math.ceil(length / 2);
		const leftResult = majorityElementHelper(array, start, split);
		const rightResult = majorityElementHelper(array, split + 1, end);

		const a = leftResult.length >= 0 ? leftResult[0] : undefined;
		const b = leftResult.length >= 1 ? leftResult[1] : undefined;
		const c = rightResult.length >= 0 ? rightResult[0] : undefined;
		const d = rightResult.length >= 1 ? rightResult[1] : undefined;

		

		// const dEquals = 1 + (d === a ? 1 : 0) + (d === b ? 1 : 0) + (d === c ? 1 : 0);









		// if(aEquals >= 2) {
			

		// }
		// // const bEquals = 1 + (b === c ? 1 : 0) + (b === d ? 1 : 0);
		// const cEquals = 1 + (c === d ? 1 : 0);



		const hits: {[key: number]: number} = {};
		hits[a] = hits[a] === undefined ? 1 : hits[a] + 1;
		hits[b] = hits[b] === undefined ? 1 : hits[b] + 1;
		hits[c] = hits[c] === undefined ? 1 : hits[c] + 1;
		hits[d] = hits[d] === undefined ? 1 : hits[d] + 1;

	}
};

/**
 * A majority element is an element that makes up more than half of the items in an array.
 * Given a positive integers array, finds the majority element.
 * If there is no majority element, returns undefined.
 * T = 
 * S = 
 * @param array the array
 * @returns the mahority element, if any
 */
export const majorityElementV2 = (array: number[]): number | undefined => {

	const recursiveResult = majorityElementHelper(array, 0, array.length - 1);
	return recursiveResult.length === 0 ? undefined : recursiveResult[0];
};

// import { randomIntegerArray, shuffle } from '../../helpers/utils';
// import { majorityElementV1 } from './v1';

// const tests = [
// 	[],
// 	[ 1 ],
// 	[ 1, 2 ],
// 	[ 1, 1 ],
// 	[ 1, 1, 2 ],
// 	[ 1, 2, 1 ],
// 	[ 2, 1, 1 ],
// 	[ 1, 1, 2, 2 ],
// 	[ 1, 2, 1, 2 ],
// 	[ 1, 2, 3, 3 ],
// 	[ 3, 1, 2, 3 ],
// 	[ 1, 3, 3, 1 ],
// 	[ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ],
// 	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
// 	[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
// 	shuffle([ 1, 1, 1, 1, 5, 6, 7, 8, 9, 10 ]),
// 	shuffle([ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ]),
// 	shuffle([ 1, 1, 1, 1, 1, 2, 3, 4, 5, 6 ]),
// 	[ 1, 2, 5, 9, 5, 9, 5, 5, 5 ],
// 	shuffle([ 1, 2, 5, 9, 5, 9, 5, 5, 5 ]),
// 	randomIntegerArray(30, 1, 2),
// 	randomIntegerArray(30, 1, 3),
// 	shuffle([ ...randomIntegerArray(20, 1, 3), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]),
// 	shuffle([ ...randomIntegerArray(15, 1, 3), 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]),
// 	shuffle([ ...randomIntegerArray(15, 1, 3), 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2 ])
// ];

// console.log('\n\n**********************\n\n');
// for(const test of tests) {

// 	const testString = test.join(', ');

// 	const resultV1 = majorityElementV1([ ...test ]);

// 	console.log(`${testString} -> V1 = ${resultV1}`);
// }

const aaa = (a: number | undefined, b: number | undefined, c: number | undefined, d: number | undefined): number[] => {

	const aEquals = 1 + (a === b ? 1 : 0) + (a === c ? 1 : 0) + (a === d ? 1 : 0);
	if(a !== undefined && aEquals >= 3) {
		return [ a ];
	}
	const bEquals = 1 + /*(b === a ? 1 : 0) +*/ (b === c ? 1 : 0) + (b === d ? 1 : 0);
	if(b !== undefined && bEquals >= 3) {
		return [ b ];
	}
	if(a !== undefined && b !== undefined && aEquals === 2 && bEquals === 2) {

		return [ a, b ];
	}
	const cEquals = 1 + /*(c === a ? 1 : 0) + (c === b ? 1 : 0) +*/ (c === d ? 1 : 0);
	if(a !== undefined && c !== undefined && aEquals === 2 && cEquals === 2) {

		return [ a, c ];
	}
	if(b !== undefined && c !== undefined && bEquals === 2 && cEquals === 2) {

		return [ b, c ];
	}

	if(a !== undefined && aEquals === 2) {

		return [ a ];
	}
	if(b !== undefined && bEquals === 2) {

		return [ b ];
	}
	if(c !== undefined && cEquals === 2) {

		return [ c ];
	}

	return [];
};

const DOMAIN = [ 1, 2, undefined ];



const tests = [
	// [ undefined, undefined, undefined, undefined ],

	// [ 1, undefined, undefined, undefined ],
	// [ undefined, 1, undefined, undefined ],
	// [ undefined, undefined, 1, undefined ],
	// [ undefined, undefined, undefined, 1 ],

	// [ 1, 1, undefined, undefined ],
	// [ 1, undefined, 1, undefined ],
	// [ 1, undefined, undefined, 1 ],
	// [ undefined, 1, 1, undefined ],
	// [ undefined, 1, undefined, 1 ],
	// [ undefined, undefined, 1, 1 ],

	// [ 1, 2, undefined, undefined ],
	// [ 1, undefined, 2, undefined ],
	// [ 1, undefined, undefined, 2 ],
	// [ undefined, 1, 2, undefined ],
	// [ undefined, 1, undefined, 2 ],
	// [ undefined, undefined, 1, 2 ],

	// [ 2, 1, undefined, undefined ],
	// [ 2, undefined, 1, undefined ],
	// [ 2, undefined, undefined, 1 ],
	// [ undefined, 2, 1, undefined ],
	// [ undefined, 2, undefined, 1 ],
	// [ undefined, undefined, 2, 1 ],

	// [ 1, 1, 1, undefined ],

	// [ 1, 1, 1, 1 ],

	// [ 1, 1 ],
	// [ 1, 2 ],
	// [ 2, 1 ],

	// [ 1, 1 ],
	// [ 1, 2 ],
	// [ 2, 1 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const testString = test.join(', ');

	const resultV1 = majorityElementV1([ ...test ]);

	console.log(`${testString} -> V1 = ${resultV1}`);
}



/**
 * A majority element is an element that makes up more than half of the items in an array.
 * Given a positive integers array, finds the majority element(s).
 * T = O(N)
 * S = O(1)
 * @param array the array
 * @returns the majority element(s), if any
 */
 export const majorityElementsV2 = (array: number[]): number[] => {

	if(array.length === 0) {

		return [];
	}
	else if(array.length === 1) {

		return [ array[0] ];
	}

	let currentIndex = 0;
	let currentConsecutiveValues = 1;
	let maxConsecutiveValues = 1;
	let indicesWithMaxConsecutiveValues: number[] = [];
	for(let i = 1; i < array.length; i++) {

		if(array[currentIndex] === array[i]) {

			currentConsecutiveValues += 1;

			if(currentConsecutiveValues > maxConsecutiveValues) {
	
				maxConsecutiveValues = currentConsecutiveValues;
				indicesWithMaxConsecutiveValues = [ currentIndex ];
			}
			else if(currentConsecutiveValues === maxConsecutiveValues && indicesWithMaxConsecutiveValues.length < 2 && array[indicesWithMaxConsecutiveValues[0]] !== array[i]) {

				indicesWithMaxConsecutiveValues.push(currentIndex);
			}
		}
		else {

			currentConsecutiveValues = 1;
			currentIndex = i;
		}
	}

	if(maxConsecutiveValues === 1) {

		if(array[0] === array[1]) {

			indicesWithMaxConsecutiveValues = [ 0 ];
		}
		else {

			indicesWithMaxConsecutiveValues = [ 0, 1 ];
		}
	}

	if(maxConsecutiveValues === 2 && ) {


	}

	const result = [];
	for(const indexWithMaxConsecutiveValues of indicesWithMaxConsecutiveValues) {

		const valueWithMaxConsecutives = array[indexWithMaxConsecutiveValues];

		let count = 0;
		for(const value of array) {

			if(value === valueWithMaxConsecutives) {

				count += 1;
			}
		}

		if(count >= array.length / 2) {

			result.push(valueWithMaxConsecutives);
		}
	}
	result.sort();
	return result;
};
