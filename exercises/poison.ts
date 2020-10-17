import { getBit, setBit } from './helpers/binary';

class TestStrip {

	public isPositive = false;
	public bottleIndices: number[] = [];
}

class PoisonTester {

	private readonly daysToTest = 7;
	private readonly poisonIndexSolution: number;
	public totalTestDays = 0;

	public constructor(poisonIndexSolution: number) {

		this.poisonIndexSolution = poisonIndexSolution;
	}

	public test(testStrips: TestStrip[]): void {

		for(const testStrip of testStrips) {

			if(testStrip.isPositive) {

				throw Error('Cannot resubmit positive strip!');
			}

			testStrip.isPositive = testStrip.bottleIndices.includes(this.poisonIndexSolution);

			testStrip.bottleIndices = [];
		}

		this.totalTestDays += this.daysToTest;
	}
}

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

for(let i = 0; i < 100; i++) {

	const bottlesNumber = 1000;
	const solution = Math.floor(Math.random() * (bottlesNumber + 1));
	const testStrips = [ new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip() ];
	
	const result = isPoisonV2(bottlesNumber, testStrips, solution);

	console.log(`${bottlesNumber} bottles with ${testStrips.length} strips (poisoned bottle is ${solution}) -> found bottle ${result.poisonIndex} in ${result.totalTestDays} days`);
}
