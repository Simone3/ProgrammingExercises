import { randomInteger } from '../../helpers/utils';

// Iterative version of shuffleV6
export const shuffleV7 = (array: string[]): void => {
	
	for(let i = 0; i < array.length; i++) {

		const k = randomInteger(0, i);
		const temp = array[k];
		array[k] = array[i];
		array[i] = temp;
	}
};
