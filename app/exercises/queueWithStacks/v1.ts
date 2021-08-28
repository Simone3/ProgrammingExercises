import { SimpleStack } from '../../data-structures/stack';

/**
 * Implementation of a queue using two stacks
 */
export class QueueWithStacks<T = string> {

	/**
	 * Stack used for add operations (stack order)
	 */
	private insertOrderStack = new SimpleStack<T>();

	/**
	 * Stack used for remove/peek/toString operations (queue order)
	 */
	private reverseInsertOrderStack = new SimpleStack<T>();

	/**
	 * Flag to tell if we are using one stack or the other
	 */
	private isInsertOrderStackActive = true;
	
	/**
	 * Adds a new item to the end of the queue
	 * T = O(1) if prev. operation was another add, O(N) otherwise
	 * S = O(1)
	 * @param data the data to push
	 */
	public add(data: T): void {

		this.switchToInsertOrderStack();
		this.insertOrderStack.push(data);
	}

	/**
	 * Removes and returns the first element of the queue
	 * T = O(1) if prev. operation was remove/peek/toString, O(N) otherwise
	 * S = O(1)
	 * @returns the top element of the queue
	 */
	public remove(): T {

		this.switchToReverseInsertOrderStack();
		return this.reverseInsertOrderStack.pop();
	}

	/**
	 * Returns the top element of the queue
	 * T = O(1) if prev. operation was remove/peek/toString, O(N) otherwise
	 * S = O(1)
	 * @returns the top element of the queue
	 */
	public peek(): T {

		this.switchToReverseInsertOrderStack();
		return this.reverseInsertOrderStack.peek();
	}

	/**
	 * Checks if the queue is empty
	 * T = O(1)
	 * S = O(1)
	 * @returns true if the queue is empty
	 */
	public isEmpty(): boolean {

		return this.isInsertOrderStackActive ? this.insertOrderStack.isEmpty() : this.reverseInsertOrderStack.isEmpty();
	}

	/**
	 * Prints the queue as a string
	 * T = O(N)
	 * S = O(1)
	 * @returns the string representation
	 */
	public toString(): string {

		this.switchToReverseInsertOrderStack();
		return this.reverseInsertOrderStack.toString();
	}

	/**
	 * Switches to the insertion order stack if necessary
	 */
	private switchToInsertOrderStack(): void {

		if(!this.isInsertOrderStackActive) {

			while(!this.reverseInsertOrderStack.isEmpty()) {

				this.insertOrderStack.push(this.reverseInsertOrderStack.pop());
			}

			this.isInsertOrderStackActive = true;
		}
	}

	/**
	 * Switches to the reverse insertion order stack if necessary
	 */
	private switchToReverseInsertOrderStack(): void {

		if(this.isInsertOrderStackActive) {

			while(!this.insertOrderStack.isEmpty()) {

				this.reverseInsertOrderStack.push(this.insertOrderStack.pop());
			}

			this.isInsertOrderStackActive = false;
		}
	}
}
