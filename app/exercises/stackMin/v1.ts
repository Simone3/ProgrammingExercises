import { SimpleStack, Stack } from '../../data-structures/stack';

/**
 * Implementation of a stack that keeps track of the current minimum value.
 * Uses S = O(N) extra space.
 */
export class MinStack extends SimpleStack<number> {

	/**
	 * Parallel stack that keeps track of the min for the corresponding node in the main stack.
	 * E.g.
	 * - main stack: 5 3 7 1 5
	 * - min stack:  5 3 3 1 1
	 */
	public minStack: Stack<number> | undefined;

	/**
	 * @override
	 */
	public push(data: number): void {

		super.push(data);

		if(!this.minStack) {

			this.minStack = new SimpleStack<number>();
		}

		if(this.minStack.isEmpty()) {

			this.minStack.push(data);
		}
		else {

			const currentMin = this.minStack.peek();
			this.minStack.push(Math.min(currentMin, data));
		}
	}

	/**
	 * @override
	 */
	public pop(): number {

		const result = super.pop();

		if(!this.minStack) {

			throw Error('This should never happen');
		}

		this.minStack.pop();

		return result;
	}

	/**
	 * Returns the current minimum value in the whole stack
	 * @returns the current min value
	 */
	public min(): number {

		if(!this.minStack) {

			throw Error('This should never happen');
		}

		return this.minStack.peek();
	}
}
