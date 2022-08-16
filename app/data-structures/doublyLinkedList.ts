/**
 * A doubly linked list node
 * @template T the payload type
 */
export interface Node<T> {

	/**
	 * The node payload
	 */
	data: T;
	
	/**
	 * The previous node pointer
	 */
	prev: Node<T> | undefined;
	
	/**
	 * The next node pointer
	 */
	next: Node<T> | undefined;
}

/**
 * A doubly linked list
 * @template T the nodes payload type
 */
export interface DoublyLinkedList<T> {

	/**
	 * The head node pointer
	 */
	head: Node<T> | undefined;

	/**
	 * The tail node pointer
	 */
	tail: Node<T> | undefined;

	/**
	 * Adds a new element as the new head
	 * @param newValue the new element
	 */
	addToHead(newValue: T): void;

	/**
	 * Adds a new element as the new tail
	 * @param newValue the new element
	 */
	addToTail(newValue: T): void;

	/**
	 * Removes and returns the head element
	 * @returns head element data
	 */
	removeHead(): T;

	/**
	 * Removes and returns the tail element
	 * @returns tail element data
	 */
	removeTail(): T;

	/**
	 * Empties the list
	 */
	clear(): void;

	/**
	 * Computes the length of the linked list. Needs to loop the whole list each time.
	 * @returns the list length
	 */
	length(): number;

	/**
	 * Prints the linked list as a string
	 * @param start optional starting point (defaults to HEAD)
	 * @param dataToString optional function to transform each node data to string (defaults to String(data))
	 * @returns the string representation
	 */
	toString(start?: 'HEAD' | 'TAIL', dataToString?: (data: T) => string): string;
}

/**
 * Simple implementation of a doubly linked list node
 * @template T the payload type, defaults to string
 */
export class SimpleNode<T = string> implements Node<T> {

	public data: T;
	public prev: Node<T> | undefined;
	public next: Node<T> | undefined;

	/**
	 * The constructor
	 * @param data the node payload
	 * @param prev the optional previous node pointer
	 * @param next the optional next node pointer
	 */
	public constructor(data: T, prev?: Node<T>, next?: Node<T>) {

		this.data = data;
		this.prev = prev;
		this.next = next;
	}
}

/**
 * Simple implementation of a doubly linked list
 * @template T the nodes payload type, defaults to string
 */
export class SimpleDoublyLinkedList<T = string> implements DoublyLinkedList<T> {

	public head: Node<T> | undefined;
	public tail: Node<T> | undefined;

	/**
	 * The constructor
	 * @param nodesData the optional initial nodes data as an array
	 */
	public constructor(nodesData?: T[]) {

		if(nodesData && nodesData.length > 0) {

			let node = new SimpleNode(nodesData[0]);
			this.head = node;
			for(let i = 1; i < nodesData.length; i++) {

				const newNode = new SimpleNode(nodesData[i]);
				newNode.prev = node;
				node.next = newNode;
				node = newNode;
			}
			this.tail = node;
		}
	}

	/**
	 * @override
	 */
	public addToHead(newValue: T): void {

		const newNode = new SimpleNode(newValue);

		if(this.head) {

			newNode.next = this.head;
			newNode.prev = undefined;

			this.head.prev = newNode;

			this.head = newNode;
		}
		else {

			this.head = this.tail = newNode;
		}
	}

	/**
	 * @override
	 */
	public addToTail(newValue: T): void {

		const newNode = new SimpleNode(newValue);

		if(this.tail) {

			newNode.next = undefined;
			newNode.prev = this.tail;

			this.tail.next = newNode;

			this.tail = newNode;
		}
		else {

			this.head = this.tail = newNode;
		}
	}
 
	/**
	 * @override
	 */
	public removeHead(): T {

		if(this.head) {

			const data = this.head.data;
			const next = this.head.next;

			if(next) {

				next.prev = undefined;

				this.head = next;
			}
			else {

				this.head = this.tail = undefined;
			}

			return data;
		}
		else {

			throw Error('Cannot remove head from an empty list!');
		}
	}
 
	/**
	 * @override
	 */
	public removeTail(): T {

		if(this.tail) {

			const data = this.tail.data;
			const prev = this.tail.prev;

			if(prev) {

				prev.next = undefined;

				this.tail = prev;
			}
			else {

				this.head = this.tail = undefined;
			}

			return data;
		}
		else {

			throw Error('Cannot remove tail from an empty list!');
		}
	}

	/**
	 * @override
	 */
	public clear(): void {

		this.head = this.tail = undefined;
	}

	/**
	 * @override
	 */
	public length(): number {

		let length = 0;
		let currNode = this.head;
		while(currNode) {

			length += 1;
			currNode = currNode.next;
		}
		return length;
	}

	/**
	 * @override
	 */
	public toString(start?: 'HEAD' | 'TAIL', dataToString?: (data: T) => string): string {

		if(!dataToString) {

			dataToString = (data) => {
				return String(data);
			};
		}

		if((!start || start === 'HEAD') && this.head) {

			const cycleCheckMap = new Map<Node<T>, boolean>();
			cycleCheckMap.set(this.head, true);
			let result = dataToString(this.head.data);
			let node = this.head.next;
			while(node) {

				if(cycleCheckMap.get(node)) {

					result += ` -> [CYCLE on ${dataToString(node.data)}] -> ...`;
					break;
				}

				cycleCheckMap.set(node, true);

				result += ` -> ${dataToString(node.data)}`;
				node = node.next;
			}

			return result;
		}
		else if(start === 'TAIL' && this.tail) {

			const cycleCheckMap = new Map<Node<T>, boolean>();
			cycleCheckMap.set(this.tail, true);
			let result = dataToString(this.tail.data);
			let node = this.tail.prev;
			while(node) {

				if(cycleCheckMap.get(node)) {

					result += ` -> [CYCLE on ${dataToString(node.data)}] -> ...`;
					break;
				}

				cycleCheckMap.set(node, true);

				result += ` -> ${dataToString(node.data)}`;
				node = node.prev;
			}

			return result;
		}
		else {

			return '-';
		}
	}
}
