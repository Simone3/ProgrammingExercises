import { Node, SimpleNode, SimpleSinglyLinkedList } from './singlyLinkedList';

/**
 * A key-value map
 */
export interface Map<K, V> {

	/**
	 * Gets a map element
	 * @param key the key
	 * @returns the value, or undefined if not found
	 */
	get(key: K): V | undefined;

	/**
	 * Puts a map element
	 * @param key the key
	 * @param value the value
	 */
	put(key: K, value: V): void;

	/**
	 * Removes a map element
	 * @param key the key
	 */
	remove(key: K): void;

	/**
	 * Prints the map
	 * @returns the string representation
	 */
	toString(): string;
}

/**
 * A key-value pair
 */
type MapValue<K, V> = {

	key: K;
	value: V;
}

/**
 * Helper class to define a linked list of MapValue objects
 */
class MapValuesList<K, V> extends SimpleSinglyLinkedList<MapValue<K, V>> {

}

/**
 * A key-value map implemented with an array of linked lists
 */
export class ArrayHashMap<K, V> implements Map<K, V> {

	private readonly DEFAULT_CAPACITY = 1024;
	private readonly hashArray: MapValuesList<K, V>[] = [];

	/**
	 * Constructor
	 * @param capacity optional capacity (support array length)
	 */
	public constructor(capacity?: number) {

		if(!capacity) {

			capacity = this.DEFAULT_CAPACITY;
		}
		else if(capacity <= 0) {

			throw Error('Invalid capacity');
		}

		this.hashArray.length = capacity;
	}

	/**
	 * @override
	 */
	public get(key: K): V | undefined {

		const index = this.getKeyIndex(key);
		const linkedList = this.hashArray[index];

		// If there's a linked list in the current hash index, search the element with the given key and return it
		if(linkedList) {

			let node = linkedList.head;
			while(node) {

				if(node.data.key === key) {

					return node.data.value;
				}

				node = node.next;
			}
		}
		
		return undefined;
	}

	/**
	 * @override
	 */
	public put(key: K, value: V): void {

		const index = this.getKeyIndex(key);
		const linkedList = this.hashArray[index];
		const newData = { key, value };

		if(linkedList) {

			const head = linkedList.head;
			if(head) {

				let prev = head;
				let node: Node<MapValue<K, V>> | undefined = head;
				while(node) {

					if(node.data.key === key) {

						// There's already an element with the same key: replace it
						node.data = newData;
						return;
					}

					prev = node;
					node = node.next;
				}

				// There's no element with the same key but other elements with the same hash: add it to the end of the linked list
				prev.next = new SimpleNode(newData);
			}
			else {

				// There's no element in the linked-list: simply add the current one
				linkedList.head = new SimpleNode(newData);
			}
		}
		else {

			// There's no linked-list: initialize it
			this.hashArray[index] = new MapValuesList([ newData ]);
		}
	}

	/**
	 * @override
	 */
	public remove(key: K): void {

		const index = this.getKeyIndex(key);
		const linkedList = this.hashArray[index];

		// If there's a linked list in the current hash index, search the element with the given key and remove it
		if(linkedList) {

			let prev;
			let node = linkedList.head;
			while(node) {

				if(node.data.key === key) {

					if(prev) {

						prev.next = node.next;
					}
					else {

						linkedList.head = node.next;
					}

					return;
				}

				prev = node;
				node = node.next;
			}
		}
		
		return undefined;
	}

	/**
	 * @override
	 */
	public toString(): string {

		let result = '';

		for(const linkedList of this.hashArray) {

			if(linkedList) {

				let node = linkedList.head;
				while(node) {

					result += `[${JSON.stringify(node.data.key)}] -> (${JSON.stringify(node.data.value)}); `;
					node = node.next;
				}
			}
		}

		if(result.length) {

			result = result.substr(0, result.length - 2);
		}

		return `{${result}}`;
	}

	/**
	 * Helper to get a key index
	 * @param key the key
	 * @returns the index between 0 and the array length
	 */
	private getKeyIndex(key: K): number {

		// Very simple implementation that returns the modulo of the key hash
		return Math.abs(this.getObjectHash(key)) % this.hashArray.length;
	}

	/**
	 * Helper to compute an object hash
	 * @param value the object to hash
	 * @returns the hash value
	 */
	private getObjectHash(value: unknown): number {

		// Very simple implementation thah returns the hash of the JSON-ified object
		const string = typeof value === 'string' ? value : JSON.stringify(value);
		let hash = 0;
		for(let i = 0; i < string.length; i++) {

			hash = ((hash << 5) - hash) + string.charCodeAt(i);
			hash |= 0;
		}
		return hash;
	}
}
