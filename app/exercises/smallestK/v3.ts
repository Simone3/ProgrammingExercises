import { DoublyLinkedList, Node, SimpleDoublyLinkedList, SimpleNode } from '../../data-structures/doublyLinkedList';

/**
 * Helper to add a new element to a sorted linked list
 * @param list the linked list
 * @param value the new value
 */
const addToSortedLinkedList = (list: DoublyLinkedList<number>, value: number): void => {

	const newNode = new SimpleNode(value);

	// Linked list is empty
	if(!list.head || !list.tail) {

		list.head = list.tail = newNode;
		return;
	}

	let prev: Node<number> | undefined;
	let curr: Node<number> | undefined = list.head;
	while(curr) {

		// "curr" is the first node with a value greater than the new one, place the new node between "prev" and "curr"
		if(curr.data > value) {

			newNode.next = curr;
			newNode.prev = prev;
			curr.prev = newNode;

			if(prev) {

				prev.next = newNode;
			}
			else {

				list.head = newNode;
			}

			return;
		}
		
		prev = curr;
		curr = curr.next;
	}

	// If we get here, the new value is the new tail
	newNode.prev = list.tail;
	list.tail.next = newNode;
	list.tail = newNode;
};

/**
 * Helper to remove the greatest element in a sorted linked list
 * @param list the linked list
 */
const removeGreatestElementFromSortedLinkedList = (list: DoublyLinkedList<number>): void => {

	if(list.tail) {

		if(list.tail.prev) {

			list.tail.prev.next = undefined;
			list.tail = list.tail.prev;
		}
		else {

			list.tail = list.head = undefined;
		}
	}
};

/**
 * Finds the smallest K numbers in an array
 * @param array the source array
 * @param count the number of elements to find (K)
 * @returns the K smallest numbers
 *
 * T = O(N * K) in the worst case (loop on K is only performed when a new smallest element is found, usually not at every iteration of N)
 * S = O(K)
 */
export const getSmallestV3 = (array: number[], count: number): number[] => {

	if(count <= 0 || count > array.length) {

		throw Error('Invalid number of elements!');
	}
	
	if(count === array.length) {

		return [ ...array ];
	}

	const resultSortedLinkedList: DoublyLinkedList<number> = new SimpleDoublyLinkedList();

	// Add the first K elements of the array to the temporary result (sorted linked list)
	for(let i = 0; i < count; i++) {

		addToSortedLinkedList(resultSortedLinkedList, array[i]);
	}

	for(let i = count; i < array.length; i++) {

		// If the current element is smaller than the greatest element in the result linked list, remove the tail and add the new element to the list
		if(resultSortedLinkedList.tail && array[i] < resultSortedLinkedList.tail.data) {

			removeGreatestElementFromSortedLinkedList(resultSortedLinkedList);
			addToSortedLinkedList(resultSortedLinkedList, array[i]);
		}
	}

	const result = [];

	let node = resultSortedLinkedList.head;
	while(node) {

		result.push(node.data);
		node = node.next;
	}

	return result;
};
