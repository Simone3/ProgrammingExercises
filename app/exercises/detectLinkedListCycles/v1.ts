import { Node, SinglyLinkedList } from '../../data-structures/singlyLinkedList';

/**
 * Given a circular linked list, it returns the node at the beginning of the loop
 * T = O(N)
 * S = O(N)
 * @param list the input list
 * @returns the node at the beginning of the loop if it exists, or undefined if the list is not circular
 */
export const detectLinkedListCycle = <T> (list: SinglyLinkedList<T>): Node<T> | undefined => {

	const map = new Map<Node<T>, boolean>();
	let currNode = list.head;
	while(currNode) {

		if(map.get(currNode)) {

			return currNode;
		}

		map.set(currNode, true);

		currNode = currNode.next;
	}

	return undefined;
};
