import { Node, SinglyLinkedList } from './helpers/singlyLinkedList';

/**
 * Given two (singly) linked lists, determines if the two lists intersect by returning the intersecting node.
 * Note that the intersection is defined based on reference, not value.
 * T = O(N + M)
 * S = O(1)
 * @param firstList the first input list
 * @param secondList the second input list
 * @returns the intersecting node if it exists, or undefined if the two lists do not intersect
 */
export const getIntersectingNode = (firstList: SinglyLinkedList, secondList: SinglyLinkedList): Node | undefined => {

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

const partial1 = new SinglyLinkedList([ 'x', 'y', 'z' ]);

const test1 = new SinglyLinkedList();
test1.head = new Node('a');
test1.head.next = new Node('b');
test1.head.next.next = partial1.head;

const test2 = new SinglyLinkedList();
test2.head = new Node('c');
test2.head.next = new Node('d');
test2.head.next.next = partial1.head;

const test3 = new SinglyLinkedList();
test3.head = new Node('e');
test3.head.next = new Node('f');
test3.head.next.next = new Node('g');
test3.head.next.next.next = new Node('h');
test3.head.next.next.next.next = partial1.head;

const tests: SinglyLinkedList[][] = [
	[ test1, test2 ],
	[ test1, test3 ],
	[ test2, test3 ],
	[ test3, test1 ],
	[ test1, test1 ],
	[ test1, partial1 ],
	[ partial1, test2 ],
	[ new SinglyLinkedList([]), new SinglyLinkedList([]) ],
	[ new SinglyLinkedList([ 'a' ]), new SinglyLinkedList([]) ],
	[ new SinglyLinkedList([]), new SinglyLinkedList([ 'a' ]) ],
	[ new SinglyLinkedList([ 'a' ]), new SinglyLinkedList([ 'b' ]) ],
	[ new SinglyLinkedList([ 'a', 'b' ]), new SinglyLinkedList([ 'c' ]) ],
	[ new SinglyLinkedList([ 'a' ]), new SinglyLinkedList([ 'b', 'c' ]) ],
	[ new SinglyLinkedList([ 'a', 'b', 'c', 'd' ]), new SinglyLinkedList([ 'e', 'f' ]) ],
	[ new SinglyLinkedList([ 'a', 'b' ]), new SinglyLinkedList([ 'c', 'd', 'e', 'f' ]) ],
	[ new SinglyLinkedList([ 'a', 'b', 'c', 'd' ]), new SinglyLinkedList([ 'b', 'c', 'd' ]) ]
];

for(const test of tests) {

	const intersectingNode = getIntersectingNode(test[0], test[1]);
	console.log(`'${test[0]}' <----> '${test[1]}' =====> '${intersectingNode ? intersectingNode.data : '-'}'`);
}
