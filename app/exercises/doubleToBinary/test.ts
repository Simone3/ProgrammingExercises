import { doubleToBinary } from './v1';

const tests = [
	0,
	0.5,
	0.25,
	0.75,
	0.9375,
	0.5625,
	0.0390625,
	0.1,
	0.34753425,
	1
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test} -> ${doubleToBinary(test)}`);
}
