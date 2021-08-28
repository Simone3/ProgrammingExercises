import { Node, SinglyLinkedList } from '../../data-structures/singlyLinkedList';

/**
 * Given two (singly) linked lists, determines if the two lists intersect by returning the intersecting node.
 * Note that the intersection is defined based on reference, not value.
 * T = O(N + M)
 * S = O(1)
 * @param firstList the first input list
 * @param secondList the second input list
 * @returns the intersecting node if it exists, or undefined if the two lists do not intersect
 */
export const getIntersectingNode = <T> (firstList: SinglyLinkedList<T>, secondList: SinglyLinkedList<T>): Node<T> | undefined => {

	// Compute the two lists' lengths
	const firstListLength = firstList.length();
	const secondListLength = secondList.length();

	// If one list is longer than the other, skip the first nodes of the longest because they cannot be the intersecting ones for sure
	let firstListCurrNode = firstList.head;
	let secondListCurrNode = secondList.head;
	if(firstListLength > secondListLength) {

		for(let i = 0; i < firstListLength - secondListLength; i++) {

			firstListCurrNode = firstListCurrNode?.next;
		}
	}
	else if(secondListLength > firstListLength) {

		for(let i = 0; i < secondListLength - firstListLength; i++) {

			secondListCurrNode = secondListCurrNode?.next;
		}
	}

	// Now that both lists "have the same length", loop them and find the intersecting node, if any
	while(firstListCurrNode && secondListCurrNode) {

		if(firstListCurrNode === secondListCurrNode) {

			return firstListCurrNode;
		}

		firstListCurrNode = firstListCurrNode.next;
		secondListCurrNode = secondListCurrNode.next;
	}
	return undefined;
};
