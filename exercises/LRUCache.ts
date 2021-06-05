/**
 * A node for the doubly linked list used by the LRU cache
 */
class LRUCacheNode {

	public key: number;
	public value: string;
	public next: LRUCacheNode | undefined;
	public previous: LRUCacheNode | undefined;

	public constructor(key: number, value: string, next?: LRUCacheNode, previous?: LRUCacheNode) {

		this.key = key;
		this.value = value;
		this.next = next;
		this.previous = previous;
	}

	public toString(): string {

		return `${this.key}->${this.value}`;
	}
}

/**
 * A LRU cache
 */
export class LRUCache {

	/**
	 * Max size of the cache
	 */
	private readonly maxSize: number;

	/**
	 * Current size of the cache
	 */
	private size = 0;

	/**
	 * Head of the linked list (MRU node)
	 */
	private head: LRUCacheNode | undefined;

	/**
	 * Tail of the linked list (LRU node)
	 */
	private tail: LRUCacheNode | undefined;

	/**
	 * Map key -> node for each of the linked list's nodes
	 */
	private nodesMap: {[key: number]: LRUCacheNode} = {};

	/**
	 * Constructor
	 * @param maxSize max size of the cache
	 */
	public constructor(maxSize: number) {

		if(maxSize <= 0) {

			throw Error('Invalid max size');
		}

		this.maxSize = maxSize;
	}

	/**
	 * Gets a value and, if presents, sets it as the most recently used
	 * @param key the key
	 * @returns the value
	 */
	public get(key: number): string | undefined {

		const currentNode = this.nodesMap[key];
		if(currentNode === undefined) {

			// Node not found
			return undefined;
		}
		else {

			// Node found: move it to the head (most recently used) and return its value
			this.moveNodeToHead(currentNode);
			return currentNode.value;
		}
	}

	/**
	 * Puts a value as the most recently used one, while removing the least recently used value if maximum size is reached
	 * @param key the key
	 * @param value the value
	 */
	public put(key: number, value: string): void {

		const currentNode = this.nodesMap[key];
		if(currentNode === undefined) {

			if(this.size < this.maxSize) {

				// Key is not already in the cache and there's still space left: simply add the new value at the head of the list (most recently used)
				const newNode = this.addNodeToHead(key, value);
				this.nodesMap[key] = newNode;
				this.size += 1;
			}
			else {

				if(this.tail === undefined) {

					throw Error('This should never happen, there must always be a tail at this point!');
				}

				// Key is not already in the cache and there's no space left: overwrite the tail node value (least recently used) and move it to the head of the list (most recently used)
				delete this.nodesMap[this.tail.key];
				this.nodesMap[key] = this.tail;
				this.tail.key = key;
				this.tail.value = value;
				this.moveNodeToHead(this.tail);
			}
		}
		else {

			// Key is already in the cache: overwrite its value and move the node to the head of the list (most recently used)
			currentNode.value = value;
			this.moveNodeToHead(currentNode);
		}
	}

	/**
	 * Returns the cache as a string
	 * @returns string representation
	 */
	public toString(): string {

		if(!this.tail) {

			return '';
		}

		let result = this.nodeToString(this.tail);
		let node = this.tail.next;
		while(node) {

			result += ` -> ${this.nodeToString(node)}`;
			node = node.next;
		}

		return result;
	}

	/**
	 * Helper to add a new node to the head
	 * @param key the key
	 * @param value the value
	 * @returns the new node
	 */
	private addNodeToHead(key: number, value: string): LRUCacheNode {

		const newNode = new LRUCacheNode(key, value);

		if(this.head === undefined) {

			// List is empty: simply set head and tail
			this.head = this.tail = newNode;
		}
		else {

			// List is not empty: change head pointer
			this.changeHead(newNode);
		}

		return newNode;
	}

	/**
	 * Helper to move an existing node to the head of the list
	 * @param node the node
	 */
	private moveNodeToHead(node: LRUCacheNode): void {

		if(node !== this.head) {

			if(node === this.tail) {

				// Node is the tail: reset the tail pointer
				this.tail = this.tail.next;
				if(this.tail === undefined) {

					throw Error('This should never happen, at this point there must be at least two elements!');
				}
				this.tail.previous = undefined;
			}
			else {

				if(!node.next || !node.previous) {

					throw Error('This should never happen, at this point there must be at least three elements!');
				}

				// Node is in the middle (not head nor tail): remove it from the list
				node.next.previous = node.previous;
				node.previous.next = node.next;
			}

			// Set the node as the new head
			this.changeHead(node);
		}
	}

	/**
	 * Helper to set the head pointer
	 * @param node the new head
	 */
	private changeHead(node: LRUCacheNode): void {

		if(!this.head) {

			throw Error('This should never happen, at this point there must be a previous head!');
		}

		node.next = undefined;
		node.previous = this.head;
		this.head.next = node;
		this.head = node;
	}

	/**
	 * Helper to get a node as a string
	 * @param node the node
	 * @returns string representation
	 */
	private nodeToString(node: LRUCacheNode): string {

		const nodeString = node.toString();
		let extraString = '';
		if(node === this.tail) {

			extraString += ' (LRU)';
		}
		if(node === this.head) {

			extraString += ' (MRU)';
		}

		return `{ ${nodeString}${extraString} }`;
	}
}

console.log('\n\n**********************\n\n');

type TestOperation = {

	action: 'GET' | 'PUT';
	key: number;
	putValue?: string;
};

const testOperations: TestOperation[] = [{
	action: 'GET',
	key: 1
}, {
	action: 'PUT',
	key: 1,
	putValue: 'a'
}, {
	action: 'GET',
	key: 1
}, {
	action: 'PUT',
	key: 2,
	putValue: 'b'
}, {
	action: 'PUT',
	key: 3,
	putValue: 'c'
}, {
	action: 'GET',
	key: 3
}, {
	action: 'GET',
	key: 1
}, {
	action: 'GET',
	key: 3
}, {
	action: 'GET',
	key: 99
}, {
	action: 'PUT',
	key: 2,
	putValue: 'bb'
}, {
	action: 'PUT',
	key: 3,
	putValue: 'cc'
}, {
	action: 'PUT',
	key: 2,
	putValue: 'bbb'
}, {
	action: 'PUT',
	key: 4,
	putValue: 'd'
}, {
	action: 'PUT',
	key: 5,
	putValue: 'e'
}, {
	action: 'PUT',
	key: 6,
	putValue: 'f'
}, {
	action: 'GET',
	key: 1
}, {
	action: 'PUT',
	key: 7,
	putValue: 'g'
}, {
	action: 'GET',
	key: 2
}, {
	action: 'PUT',
	key: 8,
	putValue: 'h'
}, {
	action: 'PUT',
	key: 5,
	putValue: 'ee'
}];

const cache = new LRUCache(5);

for(const testOperation of testOperations) {

	let operationDescription;
	switch(testOperation.action) {

		case 'GET':

			operationDescription = `Get ${testOperation.key}: ${cache.get(testOperation.key)}`;
			break;

		case 'PUT':

			if(!testOperation.putValue) {

				throw Error('Put operation must have value');
			}

			operationDescription = `Put ${testOperation.key} ${testOperation.putValue}`;
			cache.put(testOperation.key, testOperation.putValue);
			break;

		default:

			throw Error('Unhandled test operation');
	}

	console.log(`[${operationDescription}] -> ${' '.repeat(20 - operationDescription.length)} ${cache.toString()}`);
}

