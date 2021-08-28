import { MinStack } from './v1';

const tests: MinStack[] = [
	new MinStack([ 1 ]),
	new MinStack([ 1, 2 ]),
	new MinStack([ 2, 1 ]),
	new MinStack([ 1, 2, 3 ]),
	new MinStack([ 2, 1, 3 ]),
	new MinStack([ 3, 1, 2 ]),
	new MinStack([ 3, 2, 1 ]),
	new MinStack([ 1, 3, 2 ]),
	new MinStack([ 2, 3, 1 ]),
	new MinStack([ 5, 3, 7, 1, 5 ]),
	new MinStack([ 3, 3, 3, 1, 3, 3, 3, 3 ]),
	new MinStack([ 1, 2, 3, 4, 5, 6, 7, 8 ]),
	new MinStack([ 8, 7, 6, 5, 4, 3, 2, 1 ])
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	while(!test.isEmpty()) {

		console.log(`'${test}' =====> ${test.min()}`);
		test.pop();
	}
}
