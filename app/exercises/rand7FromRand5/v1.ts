import { randomInteger } from '../../helpers/utils';

/**
 * Generates a random number between 0 and 4 (both inclusive)
 * @returns random number
 */
export const rand5 = (): number => {
	
	return randomInteger(0, 4);
};

/**
 * Generates a random number between 0 and 6 (both inclusive) using only the given rand5() function
 * @returns random number
 */
export const rand7 = (): number => {
	
	let first;
	let second;

	// Pick two numbers between 0 and 4, excluding 4 specific pairs from all possible pairs (25 in total) -> just one iteration required in 84% of cases
	do {

		first = rand5();
		second = rand5();
	}
	while((first === 3 && second === 0) || (first === 3 && second === 1) || (first === 4 && second === 0) || (first === 4 && second === 1));

	// Sum with modulo: at this point we have 21 possible pairs (each with 1/25 probability) and each final result can be obtained from 3 pairs (e.g. pairs 0-0, 3-4 and 4-3 are the only ones that produce 0)
	return (first + second) % 7;
};
