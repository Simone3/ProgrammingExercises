/**
 * You are building a diving board by placing a bunch of planks of wood end-to-end.
 * There are two types of planks, one of length shorter and one of length longer.
 * You must use exactly K planks of wood.
 * This method generates all possible lengths for the diving board.
 * T = O(K)
 * S = O(1)
 * @param shorterPlankLength length of the short plank
 * @param longerPlankLength length of the long plank
 * @param numberOfPlanks number of planks to use
 * @returns all board lengths
 */
export const getAllBoardLengths = (shorterPlankLength: number, longerPlankLength: number, numberOfPlanks: number): number[] => {

	if(shorterPlankLength <= 0 || longerPlankLength <= 0 || shorterPlankLength > longerPlankLength) {

		throw Error('Invalid plank lenghs');
	}

	if(numberOfPlanks <= 0) {

		throw Error('Invalid plank number');
	}

	const result = [];

	for(let numberOfLongerPlanks = 0; numberOfLongerPlanks <= numberOfPlanks; numberOfLongerPlanks++) {

		result.push(numberOfLongerPlanks * longerPlankLength + (numberOfPlanks - numberOfLongerPlanks) * shorterPlankLength);
	}

	return result;
};
