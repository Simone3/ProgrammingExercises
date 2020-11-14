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
	 * Computes the length of the linked list. Needs to loop the whole list each time.
	 * @returns the list length
	 */
	length(): number;

	/**
	 * Prints the linked list as a string
	 * @param start starting point
	 * @returns the string representation
	 */
	toString(start?: 'HEAD' | 'TAIL'): string;
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
	public toString(start?: 'HEAD' | 'TAIL'): string {

		if((!start || start === 'HEAD') && this.head) {

			const cycleCheckMap = new Map<Node<T>, boolean>();
			cycleCheckMap.set(this.head, true);
			let result = String(this.head.data);
			let node = this.head.next;
			while(node) {

				if(cycleCheckMap.get(node)) {

					result += ` -> [CYCLE on ${node.data}] -> ...`;
					break;
				}

				cycleCheckMap.set(node, true);

				result += ` -> ${node.data}`;
				node = node.next;
			}

			return result;
		}
		else if(start === 'TAIL' && this.tail) {

			const cycleCheckMap = new Map<Node<T>, boolean>();
			cycleCheckMap.set(this.tail, true);
			let result = String(this.tail.data);
			let node = this.tail.prev;
			while(node) {

				if(cycleCheckMap.get(node)) {

					result += ` -> [CYCLE on ${node.data}] -> ...`;
					break;
				}

				cycleCheckMap.set(node, true);

				result += ` -> ${node.data}`;
				node = node.prev;
			}

			return result;
		}
		else {

			return '-';
		}
	}
}
