import { randomInteger } from '../../helpers/utils';

/**
 * Using Lambda expressions, it returns a random subset of arbitrary size of a list.
 * All subsets (including the empty set) should be equally likely to be chosen.
 * @param list the source set
 * @returns the random subset
 */
export const lambdaRandom = (list: number[]): number[] => {

	// Simply pick each element with a 50% chance, since for each element i half of all subsets contain element i
	return list.filter(() => {

		return randomInteger(0, 1) === 0;
	});
};
