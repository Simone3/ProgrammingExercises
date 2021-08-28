import { tripleStepV3 } from './v3';

console.log('\n\n**********************\n\n');
for(let stepsNumber = 1; stepsNumber <= 30; stepsNumber++) {

	console.log(`${stepsNumber} -> ${tripleStepV3(stepsNumber)}`);
}
