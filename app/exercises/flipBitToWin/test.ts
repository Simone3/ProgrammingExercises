import { toBinary } from '../../helpers/binary';
import { flipBitToWin } from './v1';
import { flipBitToWinV2 } from './v2';

const tests = [
	0b00000010011000000000001010100101,
	0b00000010011010000000001010100101,
	0b00000010011000000000001010101101,
	0b11010010011000000000001010100101,
	0b00001010011110100000001010100101,
	0b00001010010010100000001000111100,
	0b10000101000101010000000100011110,
	0b00000000000000000000000000000001,
	0b00000000000000000100000000000000,
	0b11111111111111111111111111111111,
	0b00000000000000000000000000000000
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${toBinary(test)} (${test}) -> ${flipBitToWin(test)}`);
}

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${toBinary(test)} (${test}) -> ${flipBitToWinV2(test)}`);
}
