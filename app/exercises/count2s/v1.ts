
/**
 * Counts the number of 2s between O and N
 * T = O(N * log N)
 * S = O(N)
 * @param maxNumber N
 * @returns the number of 2s
 */
export const count2sV1 = (maxNumber: number): number => {

	let count = 0;

	// Bruteforce the count
	for(let i = 0; i <= maxNumber; i++) {

		const iString = String(i);
		for(let j = 0; j < iString.length; j++) {

			if(iString[j] === '2') {

				count += 1;
			}
		}
	}

	return count;
};
