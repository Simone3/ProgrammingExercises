import { randomInteger } from '../../helpers/utils';

/**
 * Shuffles an array. All N! permutations are equally likely.
 * Version with while + support array.
 * @param array source array
 */
export const shuffleV1 = (array: string[]): void => {
	
	const length = array.length;
	const maxIndex = length - 1;

	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (repeat if j is already taken)
		let j;
		do {
			j = randomInteger(0, maxIndex);
		}
		while(shuffled[j] !== undefined);
		
		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};
