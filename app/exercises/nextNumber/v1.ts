
const getNextSmallest = (number: number): number | undefined => {

	// Loop all 31 bits (sign bit excluded) starting from the rightmost
	let foundFirstZero = false;
	let currentIndexMask = 1;
	let clearBitsMask = 0;
	let setBitsMask = 0;
	let firstOnesCount = 0;
	for(let i = 0; i <= 30; i++) {

		if((number & currentIndexMask) === 0) {

			if(!foundFirstZero) {

				// If this is the first 0, jsu flip the flag
				foundFirstZero = true;
			}
		}
		else if(foundFirstZero) {

			// If this is a 1 after the first 0, we can find the solution: unset the current bit, set the previous and move all 1s found just before this last 1
			clearBitsMask = ~(clearBitsMask | currentIndexMask);
			setBitsMask = (setBitsMask << (i - firstOnesCount - 2)) | (1 << (i - 1));
			return number & clearBitsMask | setBitsMask;
		}
		else {

			// If this is a 1 before the first 0, count it and pre-compute the set and clear masks
			firstOnesCount += 1;
			setBitsMask |= currentIndexMask;
			clearBitsMask |= currentIndexMask;
		}

		currentIndexMask <<= 1;
	}

	return undefined;
};

const getNextLargest = (number: number): number | undefined => {

	// Loop all 31 bits (sign bit excluded) starting from the rightmost
	let foundFirstOne = false;
	let currentIndexMask = 1;
	let setBitsCurrentIndexMask = 1;
	let clearBitsMask = 0;
	let setBitsMask = 0;
	for(let i = 0; i <= 30; i++) {

		if((number & currentIndexMask) === 0) {

			if(foundFirstOne) {

				// If this is the first non-trailing 0, we can find the solution: flip the current 0 to 1, and then move all previous 1s to the beginning of the number
				clearBitsMask = ~clearBitsMask;
				setBitsMask |= currentIndexMask;
				return number & clearBitsMask | setBitsMask;
			}
		}
		else {

			if(!foundFirstOne) {

				// If this is the first 1, just flip the flag
				foundFirstOne = true;
			}
			else {

				// If this is another 1 after the first, pre-compute the "set bits mask" to move the 1s to the end (see above)
				setBitsMask |= setBitsCurrentIndexMask;
				setBitsCurrentIndexMask <<= 1;
			}

			// Pre-compute the "clear bits mask" to move the 1s to the end (see above)
			clearBitsMask |= currentIndexMask;
		}

		currentIndexMask <<= 1;
	}

	// If no 1 has been found the number is 0 and therefore its successor is 1, otherwise there's no successor
	return foundFirstOne ? undefined : 1;
};

/**
 * Given a positive integer, returns the next smallest and the next largest number that have the same number of 1 bits in their binary representation
 * @param number the positive integer
 * @returns the next smallest and the next largest number (one or both may be undefined in special situations)
 */
export const nextNumber = (number: number): { nextSmallest: number | undefined, nextLargest: number | undefined } => {

	return {
		nextSmallest: getNextSmallest(number),
		nextLargest: getNextLargest(number)
	};
};
