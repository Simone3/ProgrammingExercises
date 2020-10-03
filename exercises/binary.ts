import { clearBit, getBit, setBit, toBinary, toDecimal } from './helpers/binary';

const decimalTests = [
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
	20,
	35,
	49,
	-1,
	-2,
	-3,
	-4,
	-5
];

const binaryTests = [
	'00000000000000000000000000000000',
	'00000000000000000000000000000001',
	'00000000000000000000000000000010',
	'00000000000000000000000000000011',
	'00000000000000000000000000000100',
	'00000000000000000000000000000101',
	'00000000000000000000000000000110',
	'00000000000000000000000000000111',
	'11111111111111111111111111111111',
	'11111111111111111111111111111110',
	'11111111111111111111111111111101',
	'11111111111111111111111111111100',
	'11111111111111111111111111111011'
];

console.log('\n\n**********************\n\n');
for(const test of decimalTests) {

	console.log(`\n${test} -> ${toBinary(test)}\n`);
	for(let i = 0; i < 3; i++) {
		
		console.log(`getBit ${i} -> ${getBit(test, i)}`);
	}
	for(let i = 0; i < 3; i++) {
		
		console.log(`setBit ${i} -> ${setBit(test, i)} (${toBinary(setBit(test, i))})`);
	}
	for(let i = 0; i < 3; i++) {
		
		console.log(`clearBit ${i} -> ${clearBit(test, i)} (${toBinary(clearBit(test, i))})`);
	}
}

console.log('\n\n**********************\n\n');
for(const test of binaryTests) {

	console.log(`${test} -> ${toDecimal(test)}\n`);
}
