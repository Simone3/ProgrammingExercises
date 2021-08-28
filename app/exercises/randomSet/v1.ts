import { randomInteger } from '../../helpers/utils';

/**
 * Randomly generates a subset of "options" with "setSize" length
 * @param options original list of values
 * @param setSize size of the subset
 * @returns a random subset
 */
export const randomSetV1 = (options: number[], setSize: number): number[] => {

	if(setSize > options.length) {

		throw Error('Set size is too big');
	}
	else if(setSize === options.length) {

		return [ ...options ];
	}

	const set: number[] = [];
	const chosen: boolean[] = [];
	let remainingSetElements = setSize;
	let index;

	// For each element of the subset, pick a random element from the original array, repeating if it was already picked previously
	while(remainingSetElements > 0) {

		do {

			index = randomInteger(0, options.length - 1);
		}
		while(chosen[index]);

		set.push(options[index]);
		chosen[index] = true;

		remainingSetElements -= 1;
	}

	return set;
};
