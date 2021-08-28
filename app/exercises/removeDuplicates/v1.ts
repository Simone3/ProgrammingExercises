import { SinglyLinkedList } from '../../data-structures/singlyLinkedList';

/**
 * Removes all duplicates from a singly linked list
 * T = O(N)
 * S = O(N)
 * @param input the input list
 */
export const removeDuplicates = (input: SinglyLinkedList<string>): void => {

	const dataMap: {[key: string]: boolean} = {};

	const head = input.head;
	if(head) {

		let prevNode = head;
		let currNode = head.next;

		dataMap[head.data] = true;

		// Loop all nodes and if the data was already found (map) remove the node
		while(currNode) {

			if(dataMap[currNode.data]) {

				prevNode.next = currNode.next;

				currNode = currNode.next;
			}
			else {

				dataMap[currNode.data] = true;

				prevNode = currNode;
				currNode = currNode.next;
			}
		}
	}
};
