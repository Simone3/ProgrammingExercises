
/**
 * A queue (FIFO)
 * @template T the data type
 */
export interface Queue<T> {

	/**
	 * Adds a new item to the end of the queue
	 * @param data the data to push
	 */
	add(data: T): void;

	/**
	 * Removes and returns the first element of the queue
	 * @returns the top element of the queue
	 */
	remove(): T;

	/**
	 * Returns the top element of the queue
	 * @returns the top element of the queue
	 */
	peek(): T;

	/**
	 * Checks if the queue is empty
	 * @returns true if the queue is empty
	 */
	isEmpty(): boolean;

	/**
	 * Computes the length of the queue. Needs to loop the whole queue each time.
	 * @returns the queue length
	 */
	length(): number;

	/**
	 * Prints the queue as a string
	 * @param stringifyData if true, calls JSON.stringify on each node data
	 * @returns the string representation
	 */
	toString(stringifyData?: boolean): string;
}

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
	 * The constructor
	 * @param data the node payload
	 * @param previous the optional previous node pointer
	 */
	public constructor(data: T, previous?: Node<T>) {

		this.data = data;
		this.previous = previous;
	}
}

/**
 * Simple implementation of a queue (FIFO)
 * @template T the data type, defaults to string
 */
export class SimpleQueue<T = string> implements Queue<T> {

	/**
	 * The starting node pointer
	 */
	private start: Node<T> | undefined;

	/**
	 * The ending node pointer
	 */
	private end: Node<T> | undefined;

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
	 * @override
	 */
	public add(data: T): void {

		const newNode = new Node<T>(data);

		if(this.end) {

			this.end.previous = newNode;
			this.end = newNode;
		}
		else {

			this.start = this.end = newNode;
		}
	}

	/**
	 * @override
	 */
	public remove(): T {

		if(!this.start) {

			throw Error('Queue is empty');
		}

		const previousStartData = this.start.data;
		
		this.start = this.start.previous;
		
		if(!this.start) {

			this.end = undefined;
		}

		return previousStartData;
	}

	/**
	 * @override
	 */
	public peek(): T {

		if(!this.start) {

			throw Error('Queue is empty');
		}

		return this.start.data;
	}

	/**
	 * @override
	 */
	public isEmpty(): boolean {

		return !this.start;
	}

	/**
	 * @override
	 */
	public length(): number {

		let length = 0;
		let node = this.start;
		while(node) {

			length += 1;
			node = node.previous;
		}
		return length;
	}

	/**
	 * @override
	 */
	public toString(stringifyData?: boolean): string {

		if(this.start) {
			
			let result = String(stringifyData ? JSON.stringify(this.start.data) : this.start.data);
			let node = this.start.previous;
			while(node) {

				result = `${stringifyData ? JSON.stringify(node.data) : node.data} -> ${result}`;
				node = node.previous;
			}

			return result;
		}
		else {

			return '-';
		}
	}
}
