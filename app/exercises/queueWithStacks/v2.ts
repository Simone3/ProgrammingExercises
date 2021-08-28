import { SimpleStack } from '../../data-structures/stack';

/**
 * Implementation of a queue using two stacks
 */
export class QueueWithStacksV2<T = string> {

	/**
	 * Stack used for add operations (stack order)
	 */
	private writeStack = new SimpleStack<T>();

	/**
	 * Stack used for remove/peek/toString operations (queue order)
	 */
	private readStack = new SimpleStack<T>();
	
	/**
	 * Adds a new item to the end of the queue
	 * T = O(1)
	 * S = O(1)
	 * @param data the data to push
	 */
	public add(data: T): void {

		// Just push on the write stack, whose elements are in insertion order
		this.writeStack.push(data);
	}

	/**
	 * Removes and returns the first element of the queue
	 * T = O(1) if readStack is not empty, O(N) otherwise
	 * S = O(1)
	 * @returns the top element of the queue
	 */
	public remove(): T {

		this.makeReadStackValid();
		return this.readStack.pop();
	}

	/**
	 * Returns the top element of the queue
	 * T = O(1) if readStack is not empty, O(N) otherwise
	 * S = O(1)
	 * @returns the top element of the queue
	 */
	public peek(): T {

		this.makeReadStackValid();
		return this.readStack.peek();
	}

	/**
	 * Checks if the queue is empty
	 * T = O(1)
	 * S = O(1)
	 * @returns true if the queue is empty
	 */
	public isEmpty(): boolean {

		return this.writeStack.isEmpty() && this.readStack.isEmpty();
	}

	/**
	 * Prints the queue as a string
	 * T = O(N)
	 * S = O(1)
	 * @returns the string representation
	 */
	public toString(): string {

		// A hack, just for test purposes
		const read = this.readStack.toString();
		const write = this.writeStack.toString().split(' -> ').reverse().join(' -> ');
		if(read !== '-' && write !== '-') {

			return `${read} -> ${write}`;
		}
		else if(read !== '-') {

			return read;
		}
		else {

			return write;
		}
	}

	/**
	 * Checks if the read stack is valid and if not makes it so
	 */
	private makeReadStackValid(): void {

		// If the read stack is empty, we do not have the latest elements (which are possibly in the write stack): move them to the read stack (while reversing their order)
		if(this.readStack.isEmpty()) {

			this.moveFromWriteStackToReadStack();
		}
	}

	/**
	 * Moves all elements from the write stack to the read stack
	 */
	private moveFromWriteStackToReadStack(): void {

		while(!this.writeStack.isEmpty()) {

			this.readStack.push(this.writeStack.pop());
		}
	}
}
