import { Node, SinglyLinkedList } from '../../data-structures/singlyLinkedList';

/**
 * Given a circular linked list, it returns the node at the beginning of the loop
 * T = O(N)
 * S = O(1)
 * @param list the input list
 * @returns the node at the beginning of the loop if it exists, or undefined if the list is not circular
 *
 * In general, a circular linked list has a non-loop part of nonLoopSize nodes and a loop part of loopSize nodes.
 * We can use two pointers, a slow one with 1-node steps and a fast one with 2-node steps.
 * When the slow pointer is at the first node of the loop (nonLoopSize nodes from head), the fast one is at 2 * nonLoopSize nodes from head.
 * This means that the fast one is at moduloSize = mod(nonLoopSize, loopSize) nodes from the slow one.
 * At this point, both pointers are inside the loop and they will eventually meet.
 * The cycle has a total length of loopSize, with a slow -> fast arc of moduloSize length and the opposite arc of loopSize - moduloSize length.
 * Since the slow pointer moves at 1-node speed and the fast one at 2-node speed, the first arc increases of 1 in length each turn and the second arc decreases of 1 in length each turn.
 * The two pointers meet when the second arc gets to 0 length, i.e. after loopSize - moduloSize iterations.
 * After these iterations, both pointers are at loopSize - moduloSize nodes from the start of the loop (e.g. the slow node starts from the start of the loop and moves loopSize - moduloSize times at 1-node speed).
 * In other words, they need to advance moduloSize nodes to get back to the start of the loop.
 * Advancing moduloSize nodes in the cycle is the same as advancing nonLoopSize nodes (since by definition moduloSize is just the modulus of nonLoopSize inside the cycle).
 * This means that if one pointer is moved back to the head of the list and then both pointers move at 1-node speed, they will meet after nonLoopSize nodes, which is the result of the funtion.
 */
export const detectLinkedListCycleV2 = <T> (list: SinglyLinkedList<T>): Node<T> | undefined => {

	// Loop the list with two pointers, a slow one with 1-node steps and a fast one with 2-node steps
	let slowCurrNode = list.head;
	let fastCurrNode = list.head;
	while(slowCurrNode && fastCurrNode && fastCurrNode.next) {

		// Move to next nodes with different speeds
		slowCurrNode = slowCurrNode.next;
		fastCurrNode = fastCurrNode.next.next;

		// If we are in a cycle, the two pointers collide after loopSize - mod(nonLoopSize, loopSize) steps
		if(slowCurrNode === fastCurrNode) {

			break;
		}
	}

	// Reached the end of the list, it's not circular
	if(!fastCurrNode || !fastCurrNode.next) {

		return undefined;
	}

	// We found a cycle, the first node in the cycle is after nonLoopSize nodes: move the slow pointer back to the head and move both at 1-node speed
	slowCurrNode = list.head;
	while(slowCurrNode && fastCurrNode) {

		// When they collide again, we found our result
		if(slowCurrNode === fastCurrNode) {

			return slowCurrNode;
		}

		// Move to next nodes with the same speed
		slowCurrNode = slowCurrNode.next;
		fastCurrNode = fastCurrNode.next;
	}

	throw Error('This should never happen!');
};
