import { toBinary } from '../../helpers/binary';
import { nextNumber } from './v1';

const tests = [
	0b00000000000000000100000000000000,
	0b00000000000000000000000000000001,
	0b01000000000000000000000000000000,
	0b00000000000000000100100000000000,
	0b00000000000000000110000000000000,
	0b00000000000011111111000000000000,
	0b00000001000000000110000000010010,
	0b00000001000000000110000000010001,
	0b00000001000000000110000000011111,
	0b01111111111111111111111111111111,
	0b00000000000000000000000000000000
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const result = nextNumber(test);
	const sm = result.nextSmallest;
	const la = result.nextLargest;
	console.log(`${toBinary(test)} (${test}) -> ${sm !== undefined ? toBinary(sm) : '-'} (${sm !== undefined ? sm : '-'}) - ${la !== undefined ? toBinary(la) : '-'} (${la !== undefined ? la : '-'})`);
}
