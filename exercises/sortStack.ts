import { Stack } from './helpers/stack';

/**
 * Sorts a stack such that the smallest items are on the top. It uses just an additional temporary stack, and not any other data structure (such as an array).
 * T = O(N^2)
 * S = O(N)
 * @param stack the stack to sort
 */
const sortStack = (stack: Stack<number>): void => {

	const supportStack = new Stack<number>();

	// Loop the whole source stack until it's empty
	while(!stack.isEmpty()) {

		// Take out the current top value from the source stack
		const currentValue = stack.pop();

		// Move back from the support stack to the main stack all values that are bigger than the current support stack's top
		let movedBackCount = 0;
		while(!supportStack.isEmpty() && supportStack.peek() >= currentValue) {

			stack.push(supportStack.pop());
			movedBackCount += 1;
		}

		// Push the current value to the support stack
		supportStack.push(currentValue);

		// Move once again the previous values onto the support stack
		while(movedBackCount > 0) {

			supportStack.push(stack.pop());
			movedBackCount -= 1;
		}
	}

	// At this point the source stack is empty and the support stack has all the elements reverse-sorted: simply move them all back to the source stack
	while(!supportStack.isEmpty()) {

		stack.push(supportStack.pop());
	}
};

const tests: Stack<number>[] = [
	new Stack<number>([]),
	new Stack<number>([ 1 ]),
	new Stack<number>([ 1, 2 ]),
	new Stack<number>([ 2, 1 ]),
	new Stack<number>([ 1, 2, 3 ]),
	new Stack<number>([ 2, 1, 3 ]),
	new Stack<number>([ 3, 1, 2 ]),
	new Stack<number>([ 3, 2, 1 ]),
	new Stack<number>([ 1, 3, 2 ]),
	new Stack<number>([ 2, 3, 1 ]),
	new Stack<number>([ 5, 3, 7, 1, 5 ]),
	new Stack<number>([ 3, 3, 3, 1, 3, 3, 3, 3 ]),
	new Stack<number>([ 1, 2, 3, 4, 5, 6, 7, 8 ]),
	new Stack<number>([ 8, 7, 6, 5, 4, 3, 2, 1 ])
];

for(const test of tests) {

	const source = test.toString();
	sortStack(test);
	const target = test.toString();

	console.log(`'${source}' =====> ${target}`);
}
