import { randomInteger } from '../../helpers/utils';
import { integerToEnglish } from './v1';

const tests = [
	0,
	1,
	9,
	10,
	19,
	20,
	21,
	45,
	100,
	101,
	111,
	123,
	1000,
	7000,
	1001,
	1011,
	1021,
	1111,
	2222,
	22222,
	222222,
	100000,
	100001,
	123000,
	123123123,
	123123123123123,
	100000000000000,
	100000100000100,
	-100000,
	Number.MIN_SAFE_INTEGER,
	Number.MAX_SAFE_INTEGER
];

for(let i = 0; i < 10; i++) {

	tests.push(randomInteger(0, 10000000));
}

console.log('\n\n**********************\n\n');
for(const test of tests) {
	
	console.log(`${test} -> ${integerToEnglish(test)};`);
}
