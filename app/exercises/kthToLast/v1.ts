import { Node, SinglyLinkedList } from '../../data-structures/singlyLinkedList';

/**
 * Finds the k-th to last element of a singly linked list.
 * T = O(N)
 * S = O(1)
 * @param list the input list
 * @param indexToLast the position to find
 * @returns the node, or undefined if length is not sufficien
 */
export const kthToLast = <T> (list: SinglyLinkedList<T>, indexToLast: number): Node<T> | undefined => {

	if(indexToLast < 0) {

		throw Error('k is not valid');
	}

	// Loop the whole list keeping track of the k-th to currNode element: when we reach the end of the list, that's the k-th to last element
	let initialCounter = 0;
	let currNode = list.head;
	let kthToLastNode = list.head;
	while(currNode) {

		if(initialCounter === indexToLast + 1) {

			kthToLastNode = kthToLastNode?.next;
		}
		else {

			initialCounter += 1;
		}

		currNode = currNode.next;
	}

	return initialCounter === indexToLast + 1 ? kthToLastNode : undefined;
};
