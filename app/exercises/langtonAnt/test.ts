import { langtonAnt } from './v1';

const tests = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	30,
	80,
	100,
	200,
	1000,
	5000
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`\n\n\n${test} moves:\n${langtonAnt(test)}`);
}
