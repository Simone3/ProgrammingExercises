import { randomInteger } from '../../helpers/utils';

// Version with indices array marked with -1 + support array
export const shuffleV4 = (array: string[]): void => {
	
	const length = array.length;
	let maxIndex = length - 1;

	// Build an array of all indices
	const indices = [];
	for(let i = 0; i < length; i++) {

		indices[i] = i;
	}
	
	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (mark its element as already used in the indices array)
		let randomIndicesIndex = randomInteger(0, maxIndex);
		let k = 0;
		while(randomIndicesIndex >= 0) {

			if(indices[k] !== -1) {

				randomIndicesIndex -= 1;
			}

			k += 1;
		}
		const j = indices[k - 1];
		indices[k - 1] = -1;
		maxIndex -= 1;

		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};
