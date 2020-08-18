import { Node, SinglyLinkedList } from './helpers/singlyLinkedList';

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

const tests: SinglyLinkedList<number>[] = [
	new SinglyLinkedList<number>([]),
	new SinglyLinkedList<number>([ 1 ]),
	new SinglyLinkedList<number>([ 1, 2 ]),
	new SinglyLinkedList<number>([ 5 ]),
	new SinglyLinkedList<number>([ 1, 5 ]),
	new SinglyLinkedList<number>([ 5, 1 ]),
	new SinglyLinkedList<number>([ 4, 1, 7, 9, 2, 3, 8, 8, 8, 10 ]),
	new SinglyLinkedList<number>([ 4, 5, 1, 7, 9, 2, 3, 8, 8, 8, 5, 10 ]),
	new SinglyLinkedList<number>([ 5, 5, 5, 1, 5, 5, 5, 5 ]),
	new SinglyLinkedList<number>([ 5, 5, 5, 7, 5, 5, 5, 5 ])
];

for(const test of tests) {

	const original = test.toString();
	linkedListPartition(test, 5);
	const partitioned = test.toString();
	console.log(`'${original}' =====> '${partitioned}'`);
}
