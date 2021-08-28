import { count2sV1 } from './v1';
import { count2sV2 } from './v2';

const tests = [ ];
for(let i = 0; i <= 100; i++) {
	tests.push(i);
}
for(let i = 200; i <= 300; i++) {
	tests.push(i);
}
for(let i = 1000; i <= 1100; i++) {
	tests.push(i);
}
tests.push(999999);
tests.push(123456789);

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const resultV1 = count2sV1(test);
	const resultV2 = count2sV2(test);
	
	console.log(`${test} -> V1 = ${resultV1}, V2 = ${resultV2} ${resultV1 === resultV2 ? '' : '[DIFFERENT!!!]'}`);
}

