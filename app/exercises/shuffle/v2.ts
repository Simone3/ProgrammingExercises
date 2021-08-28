import { randomInteger } from '../../helpers/utils';

// Version with indices array splice + support array
export const shuffleV2 = (array: string[]): void => {
	
	const length = array.length;
	let maxIndex = length - 1;

	// Build an array of all indices
	const indices = [];
	for(let i = 0; i < length; i++) {

		indices[i] = i;
	}
	
	const shuffled: string[] = [];

	for(let i = 0; i < length; i++) {

		// Get a random destination index j for element i (remove its element from the indices array)
		const randomIndicesIndex = randomInteger(0, maxIndex);
		const j = indices.splice(randomIndicesIndex, 1)[0];
		maxIndex -= 1;
		
		shuffled[j] = array[i];
	}

	// Update the original array with the shuffled copy
	for(let i = 0; i < length; i++) {

		array[i] = shuffled[i];
	}
};
