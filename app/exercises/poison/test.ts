import { TestStrip } from './common';
import { isPoisonV2 } from './v2';

console.log('\n\n**********************\n\n');
for(let i = 0; i < 100; i++) {

	const bottlesNumber = 1000;
	const solution = Math.floor(Math.random() * (bottlesNumber + 1));
	const testStrips = [ new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip(), new TestStrip() ];
	
	const result = isPoisonV2(bottlesNumber, testStrips, solution);

	console.log(`${bottlesNumber} bottles with ${testStrips.length} strips (poisoned bottle is ${solution}) -> found bottle ${result.poisonIndex} in ${result.totalTestDays} days`);
}
