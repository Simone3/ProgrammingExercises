import { Node, SinglyLinkedList } from '../../data-structures/singlyLinkedList';

/**
 * Partitions a linked list around a value x, such that all nodes less than x come before all nodes greater than or equal to x.
 * If x is contained within the list, the values of x only need to be after the elements less than x.
 * The partition element x can appear anywhere in the "right partition"; it does not need to appear between the left and right partitions.
 * T = O(N)
 * S = O(1)
 * @param list the input list
 * @param partitionElement the partition element
 */
export const linkedListPartition = (list: SinglyLinkedList<number>, partitionElement: number): void => {

	// Loop the list and add nodes to the correct partition
	let leftPartitionHead: Node<number> | undefined;
	let rightPartitionHead: Node<number> | undefined;
	let rightPartitionCurrNode: Node<number> | undefined;
	let leftPartitionCurrNode: Node<number> | undefined;
	let currNode: Node<number> | undefined = list.head;
	while(currNode) {

		const nextNode = currNode.next;
		currNode.next = undefined;

		if(currNode.data < partitionElement) {

			if(leftPartitionCurrNode) {

				leftPartitionCurrNode.next = currNode;
				leftPartitionCurrNode = currNode;
			}
			else {

				leftPartitionHead = leftPartitionCurrNode = currNode;
			}
		}
		else if(rightPartitionCurrNode) {

			rightPartitionCurrNode.next = currNode;
			rightPartitionCurrNode = currNode;
		}
		else {

			rightPartitionHead = rightPartitionCurrNode = currNode;
		}

		currNode = nextNode;
	}

	// Merge the two partitions into the list
	if(leftPartitionHead && leftPartitionCurrNode) {

		list.head = leftPartitionHead;
		leftPartitionCurrNode.next = rightPartitionHead;
	}
	else {

		list.head = rightPartitionHead;
	}
};
