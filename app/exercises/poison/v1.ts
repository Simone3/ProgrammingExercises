import { PoisonTester, TestStrip } from './common';

export const isPoisonV1 = (bottlesNumber: number, testStrips: TestStrip[], poisonIndexSolution: number): { poisonIndex: number; totalTestDays: number } => {

	const tester = new PoisonTester(poisonIndexSolution);
	poisonIndexSolution = -1;

	let currentBottlesStart = 0;
	let currentBottlesNumber = bottlesNumber;
	let currentTestStrips = testStrips;
	let currentTestStripsNumber = currentTestStrips.length;

	while(currentBottlesNumber > 1) {

		const divideBy = Math.round(currentBottlesNumber / currentTestStripsNumber);
		const divideByReminder = currentBottlesNumber - (divideBy * (currentTestStripsNumber - 1));

		// Divide all bottles between the strips (by divideBy)
		for(let tsIndex = 0; tsIndex < currentTestStripsNumber; tsIndex++) {

			const testStrip = currentTestStrips[tsIndex];
			const start = currentBottlesStart + tsIndex * divideBy;
			const end = tsIndex === currentTestStripsNumber - 1 ? start + divideByReminder : start + divideBy;
			for(let i = start; i < end; i++) {

				testStrip.bottleIndices.push(i);
			}
		}

		// Test the strips
		tester.test(currentTestStrips);

		// Get the positive strip
		let positiveStripIndex;
		for(let tsIndex = 0; tsIndex < currentTestStripsNumber; tsIndex++) {

			const testStrip = currentTestStrips[tsIndex];
			if(testStrip.isPositive) {

				positiveStripIndex = tsIndex;
				break;
			}
		}
		if(positiveStripIndex === undefined) {

			throw Error('No positive strip...!');
		}

		// Keep only the bottles used in the positive strip
		currentBottlesStart += positiveStripIndex * divideBy;
		currentBottlesNumber = positiveStripIndex === currentTestStripsNumber - 1 ? divideByReminder : divideBy;
		currentTestStrips = [ ...currentTestStrips ];
		currentTestStrips.splice(positiveStripIndex, 1);
		currentTestStripsNumber -= 1;
	}

	return {
		poisonIndex: currentBottlesStart,
		totalTestDays: tester.totalTestDays
	};
};
