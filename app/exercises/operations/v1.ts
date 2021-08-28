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
