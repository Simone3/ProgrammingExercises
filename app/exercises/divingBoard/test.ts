import { getAllBoardLengths } from './v1';

const tests = [
	[ 5, 8, 7 ],
	[ 5, 8, 1 ],
	[ 1, 2, 3 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`${test[0]}, ${test[1]}, ${test[2]} -> ${getAllBoardLengths(test[0], test[1], test[2])}`);
}

