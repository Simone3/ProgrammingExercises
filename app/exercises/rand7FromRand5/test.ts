import { rand5, rand7 } from './v1';

console.log('\n\n**********************\n\n');

const tests = 100000000;

const rand5Counter = [ 0, 0, 0, 0, 0 ];
const rand7Counter = [ 0, 0, 0, 0, 0, 0, 0 ];
for(let i = 0; i < tests; i++) {

	rand5Counter[rand5()] += 1;
	rand7Counter[rand7()] += 1;
}

console.log('rand5:');
for(let i = 0; i < rand5Counter.length; i++) {

	console.log(`${i} -> ${rand5Counter[i] / tests * 100}%`);
}

console.log('\nrand7:');
for(let i = 0; i < rand7Counter.length; i++) {

	console.log(`${i} -> ${rand7Counter[i] / tests * 100}%`);
}
