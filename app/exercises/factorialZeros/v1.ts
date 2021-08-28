/**
 * Computes a factorial
 * @param number the number
 * @returns the factorial value
 */
export const factorial = (number: number): number => {

	let result = 1;
	for(let i = 2; i <= number; i++) {

		result *= i;
	}
	return result;
};

/**
 * Computes the number of trailing zeros in N factorial
 * @param number N
 * @returns number of trailing zeros
 */
export const factorialZerosV1 = (number: number): number => {

	if(number <= 0) {

		return 0;
	}
	else {

		// Just compute the factorial and count the zeros (works only for small enough numbers)
		const fact = factorial(number);
		if(fact > Number.MAX_SAFE_INTEGER) {

			return -1;
		}
		else {

			const factorialString = fact.toFixed();
			let zeros = 0;
			for(let i = factorialString.length - 1; i >= 0; i--) {
	
				if(factorialString[i] === '0') {
	
					zeros += 1;
				}
				else {
	
					break;
				}
			}
			return zeros;
		}
	}
};
