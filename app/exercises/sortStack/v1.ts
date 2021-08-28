import { SimpleStack, Stack } from '../../data-structures/stack';

/**
 * Sorts a stack such that the smallest items are on the top. It uses just an additional temporary stack, and not any other data structure (such as an array).
 * T = O(N^2)
 * S = O(N)
 * @param stack the stack to sort
 */
export const sortStack = (stack: Stack<number>): void => {

	const supportStack = new SimpleStack<number>();

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
