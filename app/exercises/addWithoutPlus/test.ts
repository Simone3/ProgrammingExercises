import { addWithoutPlusV1 } from './v1';
import { addWithoutPlusV2 } from './v2';

const tests = [
	[ 1, 2 ],
	[ 111, 999 ],
	[ 123456789, 987654321 ],
	[ 0, 0 ],
	[ 7, 0 ],
	[ 0, 11 ],
	[ -1, -2 ],
	[ -2, -3 ],
	[ -987, -321 ],
	[ -987654321, -123456789 ],
	[ 0, -2 ],
	[ -2, 0 ],
	[ 0, -321 ],
	[ -987654321, 0 ],
	[ 1, -2 ],
	[ -3, 5 ],
	[ -31, 5 ],
	[ -3, 52 ],
	[ 987654321, -123456789 ],
	[ -987654321, 123456789 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const first = test[0];
	const second = test[1];
	const sum = first + second;
	const sumWithoutPlusV1 = addWithoutPlusV1(first, second);
	const sumWithoutPlusV2 = addWithoutPlusV2(first, second);
	console.log(`${first} + ${second} = ${sumWithoutPlusV1} = ${sumWithoutPlusV2} = ${sum}${sum === sumWithoutPlusV1 && sum === sumWithoutPlusV2 ? '' : ' **************** KO ****************'}`);
}
