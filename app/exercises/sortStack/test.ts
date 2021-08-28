import { SimpleStack, Stack } from '../../data-structures/stack';
import { sortStack } from './v1';

const tests: Stack<number>[] = [
	new SimpleStack<number>([]),
	new SimpleStack<number>([ 1 ]),
	new SimpleStack<number>([ 1, 2 ]),
	new SimpleStack<number>([ 2, 1 ]),
	new SimpleStack<number>([ 1, 2, 3 ]),
	new SimpleStack<number>([ 2, 1, 3 ]),
	new SimpleStack<number>([ 3, 1, 2 ]),
	new SimpleStack<number>([ 3, 2, 1 ]),
	new SimpleStack<number>([ 1, 3, 2 ]),
	new SimpleStack<number>([ 2, 3, 1 ]),
	new SimpleStack<number>([ 5, 3, 7, 1, 5 ]),
	new SimpleStack<number>([ 3, 3, 3, 1, 3, 3, 3, 3 ]),
	new SimpleStack<number>([ 1, 2, 3, 4, 5, 6, 7, 8 ]),
	new SimpleStack<number>([ 8, 7, 6, 5, 4, 3, 2, 1 ])
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const source = test.toString();
	sortStack(test);
	const target = test.toString();

	console.log(`'${source}' =====> ${target}`);
}
