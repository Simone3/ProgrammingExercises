import { randomInteger } from '../../helpers/utils';
import { Box } from './common';
import { StackOfBoxesSolverV2 } from './v2';

const tests: Box[][] = [
	[
		new Box(10, 10, 10),
		new Box(3, 3, 3),
		new Box(4, 4, 4),
		new Box(1, 1, 1),
		new Box(11, 11, 11)
	],
	[
		new Box(10, 10, 10),
		new Box(3, 3, 3),
		new Box(4, 4, 4),
		new Box(4, 3, 4),
		new Box(2, 50, 5),
		new Box(1, 1, 1),
		new Box(11, 11, 11)
	],
	[
		new Box(3, 3, 3),
		new Box(3, 3, 3),
		new Box(3, 3, 3),
		new Box(4, 1, 3),
		new Box(4, 4, 4),
		new Box(3, 3, 3),
		new Box(3, 3, 3)
	]
];
const randomTest = [];
for(let i = 0; i < 100; i++) {

	randomTest.push(new Box(randomInteger(1, 15), randomInteger(1, 15), randomInteger(1, 15)));
}
tests.push(randomTest);

console.log('\n\n**********************\n\n');
for(let i = 0; i < tests.length; i++) {

	const test = tests[i];

	console.log(`\n\n########## TEST ${i}`);

	const solver = new StackOfBoxesSolverV2();
	
	for(const box of test) {

		solver.addBox(box);
		console.log(`\n----- ADD BOX ${box.toString()}:\n${solver.toString()}\nSOLUTION: ${solver.getTallestPossibleStack().toString()}`);
	}
}
