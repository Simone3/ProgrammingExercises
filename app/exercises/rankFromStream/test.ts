import { randomInteger } from '../../helpers/utils';
import { RankFromStreamSolver } from './v1';

const tests = [
	[ 1, 2, 3 ],
	[ 3, 2, 1 ],
	[ 1, 6, 2, 56, 233, 1, 34, 2 ],
	[ 1, 6, 2, 2, 56, 233, 1, 34, 2, 1, 233 ],
	[ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const solver = new RankFromStreamSolver();

	console.log(`*** Stream: [ ${test.join(', ')} ]`);

	for(const number of test) {

		console.log(`* Adding ${number}`);
		solver.track(number);

		for(const check of test) {

			console.log(`Rank of ${check} is ${solver.getRank(check)}`);
		}
		for(let i = 0; i < 5; i++) {

			const random = randomInteger(1, 20);
			console.log(`Rank of ${random} is ${solver.getRank(random)}`);
		}
	}

	console.log('\n################\n');
}
