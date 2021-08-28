import { toBinary } from '../../helpers/binary';
import { randomInteger } from '../../helpers/utils';
import { recursiveMultiply } from './v1';

const tests = [
	[ 3, 7 ],
	[ 8, 2 ],
	[ 0, 5 ],
	[ 7, 0 ],
	[ 3, 3 ],
	[ 1, 18 ],
	[ 27, 1 ]
];
for(let i = 0; i < 100; i++) {

	tests.push([ randomInteger(0, 9999), randomInteger(0, 9999) ]);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const first = test[0];
	const second = test[1];
	const result = recursiveMultiply(first, second);
	console.log(`${first} (${toBinary(first)}) * ${second} (${toBinary(second)}) =====> ${result} (${toBinary(result)})}`);
}
