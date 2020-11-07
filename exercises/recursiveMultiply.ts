import { toBinary } from './helpers/binary';
import { randomInteger } from './helpers/utils';

/**
 * Multiplies two numbers without using the * operator. Assumes that the result will not overflow 32 bits.
 * @param firstNumber the first number
 * @param secondNumber the second number
 * @returns the multiplied number
 */
export const recursiveMultiply = (firstNumber: number, secondNumber: number): number => {

	if(firstNumber === 0) {

		return 0;
	}

	let currentValue;
	if((firstNumber & 0b1) === 0) {

		currentValue = 0;
	}
	else {

		currentValue = secondNumber;
	}

	return currentValue + recursiveMultiply(firstNumber >> 1, secondNumber << 1);
};

const tests = [
	[ 3, 7 ],
	[ 8, 2 ],
	[ 0, 5 ],
	[ 7, 0 ],
	[ 3, 3 ],
	[ 1, 18 ],
	[ 27, 1 ]
];
for(let i = 0; i < 100; i++) {

	tests.push([ randomInteger(0, 9999), randomInteger(0, 9999) ]);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const first = test[0];
	const second = test[1];
	const result = recursiveMultiply(first, second);
	console.log(`${first} (${toBinary(first)}) * ${second} (${toBinary(second)}) =====> ${result} (${toBinary(result)})}`);
}
