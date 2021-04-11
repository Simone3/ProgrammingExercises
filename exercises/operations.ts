/**
 * Substracts two numbers using only the + operator
 * @param a first number
 * @param b secondo number
 * @returns the result
 */
export const subtract = (a: number, b: number): number => {

	let result = a;

	if(b > 0) {

		for(let i = 0; i < b; i++) {

			result += -1;
		}
	}
	else {

		for(let i = b; i < 0; i++) {

			result += 1;
		}
	}

	return result;
};

/**
 * Multiplies two numbers using only the + operator
 * @param a first number
 * @param b secondo number
 * @returns the result
 */
export const multiply = (a: number, b: number): number => {

	let result = 0;

	if(a > 0) {

		for(let i = 0; i < a; i++) {

			result += b;
		}
	}
	else if(b > 0) {

		for(let i = 0; i < b; i++) {

			result += a;
		}
	}
	else {

		for(let i = a; i < 0; i++) {

			result = subtract(result, b);
		}
	}

	return result;
};

/**
 * Divides two numbers using only the + operator
 * @param a first number
 * @param b secondo number
 * @returns the result
 */
export const divide = (a: number, b: number): number => {

	if(b === 0) {

		if(a === 0) {

			return NaN;
		}
		else if(a > 0) {

			return Infinity;
		}
		else {

			return -Infinity;
		}
	}

	let accumulator = 0;
	let result = 0;

	if(a > 0 && b > 0) {

		while(accumulator < a) {

			accumulator += b;
			result += 1;
		}
	}
	else if(a < 0 && b < 0) {

		while(accumulator > a) {

			accumulator += b;
			result += 1;
		}
	}
	else if(a > 0 && b < 0) {

		while(accumulator < a) {

			accumulator = subtract(accumulator, b);
			result = subtract(result, 1);
		}
	}
	else {

		while(accumulator > a) {

			accumulator = subtract(accumulator, b);
			result = subtract(result, 1);
		}
	}

	return result;
};

const subtractMultiplyTests = [
	[ 0, 0 ],
	[ 0, 3 ],
	[ 3, 0 ],
	[ 1, 1 ],
	[ 5, 1 ],
	[ 1, 5 ],
	[ 3, 5 ],
	[ 5, 3 ],
	[ 0, -3 ],
	[ -3, 0 ],
	[ -1, 1 ],
	[ 1, -1 ],
	[ -5, 1 ],
	[ -1, 5 ],
	[ 5, -1 ],
	[ 1, -5 ],
	[ -3, 5 ],
	[ -5, 3 ],
	[ 3, -5 ],
	[ 5, -3 ],
	[ -3, -5 ],
	[ -5, -3 ],
	[ 9999, -777 ]
];

const divideTests = [
	[ 0, 0 ],
	[ 0, 3 ],
	[ 3, 0 ],
	[ 1, 1 ],
	[ 5, 5 ],
	[ 5, 1 ],
	[ 9, 3 ],
	[ 999, 3 ],
	[ 0, -3 ],
	[ -3, 0 ],
	[ -1, 1 ],
	[ 1, -1 ],
	[ -1, -1 ],
	[ -5, 5 ],
	[ 5, -5 ],
	[ -5, -5 ],
	[ -5, 1 ],
	[ 5, -1 ],
	[ -5, -1 ],
	[ -9, 3 ],
	[ 9, -3 ],
	[ -9, -3 ],
	[ -999, 3 ]
];

console.log('\n\n**********************\n\n');
for(const test of subtractMultiplyTests) {
	
	const a = test[0];
	const b = test[1];
	const result = subtract(a, b);
	console.log(`${a} - ${b} = ${result} [${a - b === result}]`);
}

console.log('\n\n**********************\n\n');
for(const test of subtractMultiplyTests) {
	
	const a = test[0];
	const b = test[1];
	const result = multiply(a, b);
	console.log(`${a} * ${b} = ${result} [${a * b === result}]`);
}

console.log('\n\n**********************\n\n');
for(const test of divideTests) {
	
	const a = test[0];
	const b = test[1];
	const result = divide(a, b);
	console.log(`${a} / ${b} = ${result} [${a / b === result}]`);
}
