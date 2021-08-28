import { toBinary } from '../../helpers/binary';
import { binaryInsertionV1 } from './v1';
import { binaryInsertionV2 } from './v2';

const tests = [
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 4, 7 ],
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 0, 3 ],
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 10, 13 ],
	[ 0b00000010011000000000001010100101, 0b00000000000000000000000000001101, 27, 30 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const insertion = binaryInsertionV1(test[0], test[1], test[2], test[3]);
	console.log(`${test[0]} (${toBinary(test[0])}) with ${test[1]} (${toBinary(test[1])}), from ${test[2]} to ${test[3]} -> ${insertion} (${toBinary(insertion)})`);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const insertion = binaryInsertionV2(test[0], test[1], test[2], test[3]);
	console.log(`${test[0]} (${toBinary(test[0])}) with ${test[1]} (${toBinary(test[1])}), from ${test[2]} to ${test[3]} -> ${insertion} (${toBinary(insertion)})`);
}
