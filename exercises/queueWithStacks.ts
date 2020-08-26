import { Stack } from './helpers/stack';

/**
 * Implementation of a queue using two stacks
 */
export class QueueWithStacks<T = string> {

	/**
	 * Stack used for add operations (stack order)
	 */
	private insertOrderStack = new Stack<T>();

	/**
	 * Stack used for remove/peek/toString operations (queue order)
	 */
	private reverseInsertOrderStack = new Stack<T>();

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

/**
 * Implementation of a queue using two stacks
 */
export class QueueWithStacksV2<T = string> {

	/**
	 * Stack used for add operations (stack order)
	 */
	private writeStack = new Stack<T>();

	/**
	 * Stack used for remove/peek/toString operations (queue order)
	 */
	private readStack = new Stack<T>();
	
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

type TestOperation = {

	action: 'ADD' | 'REMOVE';
	addValue?: string;
};

const testOperations: TestOperation[] = [{
	action: 'ADD',
	addValue: 'a'
}, {
	action: 'ADD',
	addValue: 'b'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'ADD',
	addValue: 'c'
}, {
	action: 'ADD',
	addValue: 'd'
}, {
	action: 'ADD',
	addValue: 'e'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'ADD',
	addValue: 'f'
}, {
	action: 'ADD',
	addValue: 'g'
}, {
	action: 'ADD',
	addValue: 'h'
}, {
	action: 'ADD',
	addValue: 'i'
}, {
	action: 'ADD',
	addValue: 'j'
}, {
	action: 'ADD',
	addValue: 'k'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'ADD',
	addValue: 'l'
}, {
	action: 'ADD',
	addValue: 'm'
}, {
	action: 'ADD',
	addValue: 'n'
}, {
	action: 'ADD',
	addValue: 'o'
}, {
	action: 'ADD',
	addValue: 'p'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}, {
	action: 'REMOVE'
}];

const queueWithStacks = new QueueWithStacksV2();
for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'ADD':

			if(!testOperation.addValue) {

				throw Error('Add operation must have value');
			}

			operationDescription = `Add ${testOperation.addValue}`;

			queueWithStacks.add(testOperation.addValue);

			break;

		case 'REMOVE':

			operationDescription = `Remove`;

			queueWithStacks.remove();

			break;

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`[${operationDescription}] -> ${' '.repeat(10 - operationDescription.length)} ${queueWithStacks.toString()}`);
}
