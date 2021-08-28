import { factorial, factorialZerosV1 } from './v1';
import { factorialZerosV2 } from './v2';

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
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
	49,
	50,
	51,
	70,
	75,
	80,
	99,
	100,
	101,
	124,
	125,
	126,
	624,
	625,
	626,
	93401
];

console.log('\n\n**********************\n\n');
for(const test of tests) {
	
	const fact = factorial(test);
	const factorialString = `${fact}`;
	const v1Result = factorialZerosV1(test);
	const v2Result = factorialZerosV2(test);
	console.log(`${test} -> ${factorialString} -> V1 = ${v1Result} - V2 = ${v2Result}`);
}
