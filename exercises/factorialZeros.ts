/**
 * Computes a factorial
 * @param number the number
 * @returns the factorial value
 */
const factorial = (number: number): number => {

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

/**
 * Computes the number of trailing zeros in N factorial
 * @param number N
 * @returns number of trailing zeros
 */
export const factorialZerosV2 = (number: number): number => {

	if(number <= 0) {

		return 0;
	}
	else {

		// The number of trailing zeros in n*(n-1)*(n-2)*...*1 is the number of total 10 factors, i.e. the number of total 2*5 factors, i.e. the number of 5 factors since 2 factors are enough for sure
		let result = 0;
		let control = number;
		while(control > 0) {

			control = Math.floor(control / 5);
			result += control;
		}
		return result;
	}
};

const tests = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
	49,
	50,
	51,
	70,
	75,
	80,
	99,
	100,
	101,
	124,
	125,
	126,
	624,
	625,
	626,
	93401
];

console.log('\n\n**********************\n\n');
for(const test of tests) {
	
	const fact = factorial(test);
	const factorialString = `${fact}`;
	const v1Result = factorialZerosV1(test);
	const v2Result = factorialZerosV2(test);
	console.log(`${test} -> ${factorialString} -> V1 = ${v1Result} - V2 = ${v2Result}`);
}
