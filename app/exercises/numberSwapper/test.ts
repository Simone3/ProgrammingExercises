import { swapNumbers } from './v1';

const tests = [
	[ 1, 2 ],
	[ 0, 0 ],
	[ -1, 1 ],
	[ 1, 0 ],
	[ 0, 1 ],
	[ 1000, 1 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	swapNumbers(test[0], test[1]);
}
