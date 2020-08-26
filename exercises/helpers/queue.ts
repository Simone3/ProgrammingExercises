
/**
 * Simple implementation of a queue node
 * @template T the payload type, defaults to string
 */
class Node<T = string> {

	/**
	 * The node payload
	 */
	public data: T;
	
	/**
	 * The previous node pointer
	 */
	public previous: Node<T> | undefined;
	
	/**
	 * The next node pointer
	 */
	public next: Node<T> | undefined;

	/**
	 * The constructor
	 * @param data the node payload
	 * @param previous the optional previous node pointer
	 * @param next the optional next node pointer
	 */
	public constructor(data: T, previous?: Node<T>, next?: Node<T>) {

		this.data = data;
		this.previous = previous;
		this.next = next;
	}
}

/**
 * Simple implementation of a queue (FIFO)
 * @template T the data type, defaults to string
 */
export class Queue<T = string> {

	/**
	 * The starting node pointer
	 */
	public start: Node<T> | undefined;

	/**
	 * The ending node pointer
	 */
	public end: Node<T> | undefined;

	/**
	 * The constructor
	 * @param data the optional initial data as an array
	 */
	public constructor(data?: T[]) {

		if(data && data.length > 0) {

			for(let i = 0; i < data.length; i++) {

				this.add(data[i]);
			}
		}
	}

	/**
	 * Adds a new item to the end of the queue
	 * @param data the data to push
	 */
	public add(data: T): void {

		const newNode = new Node<T>(data);

		newNode.next = this.end;
		
		if(this.end) {

			this.end.previous = newNode;
		}

		this.end = newNode;

		if(!this.start) {

			this.start = this.end;
		}
	}

	/**
	 * Removes and returns the first element of the queue
	 * @returns the top element of the queue
	 */
	public remove(): T {

		if(!this.start) {

			throw Error('Queue is empty');
		}

		const previousStartData = this.start.data;
		
		this.start = this.start.previous;
		
		if(this.start) {

			this.start.next = undefined;
		}
		else {

			this.end = undefined;
		}

		return previousStartData;
	}

	/**
	 * Returns the top element of the queue
	 * @returns the top element of the queue
	 */
	public peek(): T {

		if(!this.start) {

			throw Error('Queue is empty');
		}

		return this.start.data;
	}

	/**
	 * Checks if the queue is empty
	 * @returns true if the queue is empty
	 */
	public isEmpty(): boolean {

		return !this.start;
	}

	/**
	 * Prints the queue as a string
	 * @returns the string representation
	 */
	public toString(): string {

		if(this.end) {
			let result = String(this.end.data);
			let node = this.end.next;
			while(node) {

				result += ` -> ${node.data}`;
				node = node.next;
			}

			return result;
		}
		else {

			return '-';
		}
	}
}
