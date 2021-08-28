
export const flipBitToWinV2 = (number: number): number => {

	if(number === 0) {

		return 1;
	}

	let maxSoFar = 0;
	let firstCount = 0;
	let secondCount = 0;
	const firstBitMask = 0b1 << 31;

	// Right shift by 1 the number until it becomes 0 (i.e. loop all bits starting from the first)
	while(number !== 0) {

		// If the current bit is 0, the previous sequence of 1s (firstCount) is done and the current sequence of 1s (new firstCount) continues (from secondCount)
		if((number & firstBitMask) === 0) {

			if(firstCount > maxSoFar) {

				maxSoFar = firstCount;
			}

			firstCount = secondCount + 1;

			secondCount = 0;
		}

		// If the current bit is 1, both counts continue
		else {

			firstCount += 1;
			secondCount += 1;
		}

		number <<= 1;
	}

	// Check last sequence of 1s
	if(firstCount > maxSoFar) {

		maxSoFar = firstCount;
	}

	return maxSoFar;
};
