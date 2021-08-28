import { randomInteger } from '../../helpers/utils';

const shuffleV6Helper = (array: string[], from: number, to: number): void => {
	
	if(to - from !== 1) {

		// Recurse on subarray
		shuffleV6Helper(array, from, to - 1);
	}

	// Swap "to" into the shuffled subarray
	const swapIndex = randomInteger(from, to);
	if(swapIndex !== to) {

		const temp = array[swapIndex];
		array[swapIndex] = array[to];
		array[to] = temp;
	}
};

// Version with recursive helper
export const shuffleV6 = (array: string[]): void => {
	
	shuffleV6Helper(array, 0, array.length - 1);
};
