import { Node, SinglyLinkedList } from './helpers/singlyLinkedList';

/**
 * Given two numbers represented by a linked list, where each node contains a single digit. stored in reverse order, it adds the two numbers and returns the sum as a linked list.
 * For example, (7-> 1 -> 6) + (5 -> 9 -> 2) [that is, 617 + 295] returns (2 -> 1 -> 9) [that is, 912]
 * T = O(N + M)
 * S = O(1)
 * @param firstList the first input list
 * @param secondList the second input list
 * @returns the sum as another linked list (containing new node objects)
 */
export const sumLinkedLists = (firstList: SinglyLinkedList<number>, secondList: SinglyLinkedList<number>): SinglyLinkedList<number> => {

	// Loop both source lists
	let firstListCurrNode = firstList.head;
	let secondListCurrNode = secondList.head;
	let carry = 0;
	const resultList = new SinglyLinkedList<number>();
	let resultListCurrNode = resultList.head;
	while(firstListCurrNode || secondListCurrNode) {

		// Compute the current digits sum
		let digitSum = carry;
		if(firstListCurrNode) {

			digitSum += firstListCurrNode.data;
			firstListCurrNode = firstListCurrNode.next;
		}
		if(secondListCurrNode) {

			digitSum += secondListCurrNode.data;
			secondListCurrNode = secondListCurrNode.next;
		}

		// Handle carry
		if(digitSum > 9) {

			carry = 1;
			digitSum -= 10;
		}
		else {

			carry = 0;
		}

		// Add node to the result list
		if(resultListCurrNode) {

			resultListCurrNode.next = new Node<number>(digitSum);
			resultListCurrNode = resultListCurrNode.next;
		}
		else {

			resultList.head = resultListCurrNode = new Node<number>(digitSum);
		}
	}

	// Add last node for last carry, if necessary
	if(carry && resultListCurrNode) {

		resultListCurrNode.next = new Node<number>(carry);
	}

	return resultList;
};

const tests: SinglyLinkedList<number>[][] = [
	[ new SinglyLinkedList<number>([]), new SinglyLinkedList<number>([]) ],
	[ new SinglyLinkedList<number>([]), new SinglyLinkedList<number>([ 1 ]) ],
	[ new SinglyLinkedList<number>([ 1 ]), new SinglyLinkedList<number>([]) ],
	[ new SinglyLinkedList<number>([ 3, 2, 1 ]), new SinglyLinkedList<number>([]) ],
	[ new SinglyLinkedList<number>([]), new SinglyLinkedList<number>([ 3, 2, 1 ]) ],
	[ new SinglyLinkedList<number>([ 1 ]), new SinglyLinkedList<number>([ 1 ]) ],
	[ new SinglyLinkedList<number>([ 5 ]), new SinglyLinkedList<number>([ 5 ]) ],
	[ new SinglyLinkedList<number>([ 7 ]), new SinglyLinkedList<number>([ 9 ]) ],
	[ new SinglyLinkedList<number>([ 3, 2, 1 ]), new SinglyLinkedList<number>([ 1 ]) ],
	[ new SinglyLinkedList<number>([ 3, 2, 1 ]), new SinglyLinkedList<number>([ 9 ]) ],
	[ new SinglyLinkedList<number>([ 1, 1, 1 ]), new SinglyLinkedList<number>([ 9 ]) ],
	[ new SinglyLinkedList<number>([ 3, 2, 8 ]), new SinglyLinkedList<number>([ 8 ]) ],
	[ new SinglyLinkedList<number>([ 3, 2, 1 ]), new SinglyLinkedList<number>([ 3, 2, 1 ]) ],
	[ new SinglyLinkedList<number>([ 9, 9, 9 ]), new SinglyLinkedList<number>([ 1, 0, 0, 1 ]) ],
	[ new SinglyLinkedList<number>([ 7, 3 ]), new SinglyLinkedList<number>([ 3, 6 ]) ]
];

for(const test of tests) {

	console.log(`'${test[0]}' + '${test[1]}' =====> '${sumLinkedLists(test[0], test[1])}'`);
}
