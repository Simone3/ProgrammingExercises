import { calculator } from './v1';

console.log('\n\n**********************\n\n');

const tests = [
	'1',
	'123456',
	'7+5',
	'7-5',
	'7*5',
	'7/5',
	'123+321',
	'1+2+3+4+5',
	'10-1-2-3-4-5',
	'1*2*3*4',
	'300/2/25/3',
	'10+2*3*4+16-300/25/3',
	'10-2-3*4+16-6*7*8*9-1',
	'0+0*999-0/333',
	'1+2/0+3'
];

for(const test of tests) {

	const calcSolution = calculator(test);
	const evalSolution = eval(test); // eslint-disable-line no-eval
	console.log(`${test} = ${calcSolution} [${calcSolution === evalSolution ? 'OK' : 'KO!!!'}]`);
}

