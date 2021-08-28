import { getBit, setBit } from '../../helpers/binary';
import { PoisonTester, TestStrip } from './common';

export const isPoisonV2 = (bottlesNumber: number, testStrips: TestStrip[], poisonIndexSolution: number): { poisonIndex: number; totalTestDays: number } => {

	if(bottlesNumber > Math.pow(2, testStrips.length) - 1) {

		throw Error('This method does not work if the number of bottles cannot be encoded in a binary number of length equal to the test strips number');
	}

	const tester = new PoisonTester(poisonIndexSolution);
	poisonIndexSolution = -1;

	// Encode the current bottle index+1 in the strips (strips are like a binary number)
	for(let i = 1; i <= bottlesNumber; i++) {

		for(let j = 0; j < testStrips.length; j++) {

			const testStrip = testStrips[j];
			
			if(getBit(i, j) === 1) {

				testStrip.bottleIndices.push(i - 1);
			}
		}
	}

	// Test all strips once
	tester.test(testStrips);

	// Get back the positive bottle number from the positive strips (e.g. 0000000101 means that the 5th bottle is poisonous, therefore index 4)
	let poisonedBottleNumber = 0;
	for(let j = 0; j < testStrips.length; j++) {

		const testStrip = testStrips[j];
		if(testStrip.isPositive) {
			
			poisonedBottleNumber = setBit(poisonedBottleNumber, j);
		}
	}
	
	return {
		poisonIndex: poisonedBottleNumber - 1,
		totalTestDays: tester.totalTestDays
	};
};
