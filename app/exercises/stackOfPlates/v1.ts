import { SimpleStack, Stack } from '../../data-structures/stack';

/**
 * Like a literal stack of plates that if it gets too big it topples, this implementation of stack uses
 * several sub-stacks with at most MAX_STACK_SIZE elements each.
 */
export class StackOfPlates<T = string> {

	private readonly MAX_STACK_SIZE = 3;
	private stacks: Stack<T>[] = [ new SimpleStack<T>() ];
	private stackLengths = [ 0 ];
	private currentStackIndex = 0;

	/**
	 * Pushes a new item to the top of the stack
	 * @param data the data to push
	 */
	public push(data: T): void {

		// If the current stack is at max capacity, move to the next one
		if(this.stackLengths[this.currentStackIndex] >= this.MAX_STACK_SIZE) {

			this.currentStackIndex += 1;

			// If the next stack does not exist yet, create it
			if(!this.stacks[this.currentStackIndex]) {

				this.stacks.push(new SimpleStack<T>());
				this.stackLengths.push(0);
			}
		}

		// Add the element to the current stack and increase its length
		this.stacks[this.currentStackIndex].push(data);
		this.stackLengths[this.currentStackIndex] += 1;
	}

	/**
	 * Removes and returns the top element of the stack
	 * @returns the top element of the stack
	 */
	public pop(): T {

		while(this.currentStackIndex >= 0) {

			if(this.stackLengths[this.currentStackIndex] > 0) {

				// The current stack has elements, pop the first one and return it
				const value = this.stacks[this.currentStackIndex].pop();
				this.stackLengths[this.currentStackIndex] -= 1;
				return value;
			}
			else {

				// The current stack has no elements, try with the previous
				this.currentStackIndex -= 1;
			}
		}

		throw Error('No more stacks');
	}

	/**
	 * Removes and returns the top element of the sub-stack at the given index
	 * @param index the sub-stack index
	 * @returns the top element of the sub-stack
	 */
	public popAt(index: number): T {

		if(this.stacks.length <= index) {

			throw Error('Out of bounds');
		}

		if(!this.stackLengths[index]) {

			throw Error(`Stack at ${index} is empty`);
		}

		// Simply pop the element from the given stack
		this.stackLengths[index] -= 1;
		return this.stacks[index].pop();
	}

	/**
	 * Returns the top element of the stack
	 * @returns the top element of the stack
	 */
	public peek(): T {

		let index = this.currentStackIndex;
		while(index >= 0) {

			if(this.stackLengths[index] > 0) {

				// The current stack has elements, peek the top element
				return this.stacks[this.currentStackIndex].peek();
			}
			else {

				// The current stack has no elements, try with the previous
				index -= 1;
			}
		}

		throw Error('No more stacks');
	}

	/**
	 * Checks if the stack is empty
	 * @returns true if the stack is empty
	 */
	public isEmpty(): boolean {

		let index = this.currentStackIndex;
		while(index >= 0) {

			if(this.stackLengths[index] > 0) {

				// The current stack has elements, it is not empty
				return false;
			}
			else {

				// The current stack has no elements, try with the previous
				index -= 1;
			}
		}

		return true;
	}
	
	/**
	 * Prints the stack as a string
	 * @returns the string representation
	 */
	public toString(): string {

		let result = '';
		for(const stack of this.stacks) {

			result += `(${stack.toString()}) `;
		}
		return result;
	}
}
