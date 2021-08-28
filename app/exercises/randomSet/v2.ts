import { randomInteger } from '../../helpers/utils';

/**
 * V2
 * @param options original list of values
 * @param setSize size of the subset
 * @returns a random subset
 *
 * Example of execution: [ 1, 2, 3, 4, 5, 6, 7, ] with set size = 3
 *
 * add 1? yes, init  --> 1 in [0]
 * add 2? yes, init  --> 1 in [1]
 * add 3? yes, init  --> 1 in [2]
 * add 4? rand [0,4] --> 1/4 in [0], 1/4 in [1], 1/4 in [2], 1/4 out
 * add 5? rand [0,5] --> 1/5 in [0], 1/5 in [1], 1/5 in [2], 2/5 out
 * add 6? rand [0,6] --> 1/6 in [0], 1/6 in [1], 1/6 in [2], 3/6 out
 * add 7? rand [0,7] --> 1/7 in [0], 1/7 in [1], 1/7 in [2], 4/7 out
 *
 * P(X in set) = P(put X) * P(not overwrite X)
 *
 * P(1 in set) = 1 * 3/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(2 in set) = 1 * 3/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(3 in set) = 1 * 3/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(4 in set) = 1/4 * 4/5 * 5/6 * 6/7 = 1/7
 * P(5 in set) = 1/5 * 5/6 * 6/7 = 1/7
 * P(6 in set) = 1/6 * 6/7 = 1/7
 * P(7 in set) = 1/7
 */
export const randomSetV2 = (options: number[], setSize: number): number[] => {

	if(setSize > options.length) {

		throw Error('Set size is too big');
	}
	else if(setSize === options.length) {

		return [ ...options ];
	}

	// Initially fill the result with the first elements of the original array
	const set: number[] = [];
	for(let i = 0; i < setSize; i++) {

		set[i] = options[i];
	}

	// Loop all remaining elements of the original array
	for(let i = setSize; i < options.length; i++) {

		// If random number k between 0 and i (inclusive) is a valid index for the result, replace the set element
		const k = randomInteger(0, i);
		if(k < setSize) {

			set[k] = options[i];
		}
	}

	return set;
};
