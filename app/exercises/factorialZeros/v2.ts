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
