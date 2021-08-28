import { booleanEvaluation } from './v1';

const tests = [
	'1|0',
	'1&0',
	'1^0',
	'1^0|0|1',
	'0&0&0&1^1|0',
	'0|0|0|0'
];

const expectedValues = [ true, false ];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	for(const expected of expectedValues) {

		const results = booleanEvaluation(test, expected);
		console.log(`'${test}', ${expected} -----> ${results.length} results${results.length > 0 ? `, i.e. ${results.join(' - ')}` : ''}`);
	}
}
