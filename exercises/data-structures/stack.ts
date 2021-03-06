
/**
 * A stack (LIFO)
 * @template T the data type
 */
export interface Stack<T> {

	/**
	 * Pushes a new item to the top of the stack
	 * @param data the data to push
	 */
	push(data: T): void;

	/**
	 * Removes and returns the top element of the stack
	 * @returns the top element of the stack
	 */
	pop(): T;

	/**
	 * Returns the top element of the stack
	 * @returns the top element of the stack
	 */
	peek(): T;

	/**
	 * Checks if the stack is empty
	 * @returns true if the stack is empty
	 */
	isEmpty(): boolean;

	/**
	 * Prints the stack as a string
	 * @returns the string representation
	 */
	toString(): string;
}

/**
 * Simple implementation of a stack node
 * @template T the payload type, defaults to string
 */
class Node<T = string> {

	/**
	 * The node payload
	 */
	public data: T;
	
	/**
	 * The next node pointer
	 */
	public next: Node<T> | undefined;

	/**
	 * The constructor
	 * @param data the node payload
	 * @param next the optional next node pointer
	 */
	public constructor(data: T, next?: Node<T>) {

		this.data = data;
		this.next = next;
	}
}

/**
 * Simple implementation of a stack (LIFO)
 * @template T the data type, defaults to string
 */
export class SimpleStack<T = string> implements Stack<T> {

	/**
	 * The top node pointer
	 */
	private topNode: Node<T> | undefined;

	/**
	 * The constructor
	 * @param data the optional initial data as an array (the last will be the top element)
	 */
	public constructor(data?: T[]) {

		if(data && data.length > 0) {

			for(let i = 0; i < data.length; i++) {

				this.push(data[i]);
			}
		}
	}

	/**
	 * @override
	 */
	public push(data: T): void {

		const newNode = new Node<T>(data);
		newNode.next = this.topNode;
		this.topNode = newNode;
	}

	/**
	 * @override
	 */
	public pop(): T {

		if(!this.topNode) {

			throw Error('Stack is empty');
		}

		const previousTopData = this.topNode.data;
		this.topNode = this.topNode.next;
		return previousTopData;
	}

	/**
	 * @override
	 */
	public peek(): T {

		if(!this.topNode) {

			throw Error('Stack is empty');
		}

		return this.topNode.data;
	}

	/**
	 * @override
	 */
	public isEmpty(): boolean {

		return !this.topNode;
	}

	/**
	 * @override
	 */
	public toString(): string {

		if(this.topNode) {

			let result = String(this.topNode.data);
			let node = this.topNode.next;
			while(node) {

				result = `${node.data} -> ${result}`;
				node = node.next;
			}

			return result;
		}
		else {

			return '-';
		}
	}
}
