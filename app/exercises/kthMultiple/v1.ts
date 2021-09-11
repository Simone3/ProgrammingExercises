import { Multiple, newMultiple } from './common';

const SUM_OF_EXPONENTS = 150;
const MAX_K = 200000;

const ORDERED_VALUES: Multiple[] = [];

/**
 * Finds the k-th number such that the only prime factors are 3, 5, and 7.
 * Note that 3, 5, and 7 do not have to be factors, but it should not have any other prime factors.
 * For example, the first several multiples would be (in order) 1, 3, 5, 7, 9, 15, 21.
 * T = O(MAX_K^3 * log(MAX_K^3)) first time, O(1) others
 * S = O(MAX_K^3)
 * @param k the requested k
 * @returns the k-th multiple
 */
export const kthMultipleV1 = (k: number): Multiple => {

	if(k <= 0) {

		throw Error('k must start at 1');
	}

	if(k > MAX_K) {

		// Limited k values, for practical purposes (could be handled by incrementing SUM_OF_EXPONENTS if k is bigger than the current limit)
		throw Error('k is too big');
	}

	// First time, bruteforce the solution by computing and sorting all multiples
	if(ORDERED_VALUES.length === 0) {
		
		for(let a = 0; a <= SUM_OF_EXPONENTS; a++) {

			for(let b = 0; b <= SUM_OF_EXPONENTS; b++) {
		
				for(let c = 0; c <= SUM_OF_EXPONENTS; c++) {
		
					ORDERED_VALUES.push(newMultiple(a, b, c));
				}
			}
		}
		
		ORDERED_VALUES.sort((a, b) => {
			if(a.value < b.value) {
				return -1;
			}
			else if(a.value > b.value) {
				return 1;
			}
			else {
				return 0;
			}
		});
	}

	return ORDERED_VALUES[k - 1];
};

