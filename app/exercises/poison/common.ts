
export class TestStrip {

	public isPositive = false;
	public bottleIndices: number[] = [];
}

export class PoisonTester {

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
