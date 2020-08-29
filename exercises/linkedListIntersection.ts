import { Node, SimpleNode, SimpleSinglyLinkedList, SinglyLinkedList } from './data-structures/singlyLinkedList';

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

const partial1 = new SimpleSinglyLinkedList([ 'x', 'y', 'z' ]);

const test1 = new SimpleSinglyLinkedList();
test1.head = new SimpleNode('a');
test1.head.next = new SimpleNode('b');
test1.head.next.next = partial1.head;

const test2 = new SimpleSinglyLinkedList();
test2.head = new SimpleNode('c');
test2.head.next = new SimpleNode('d');
test2.head.next.next = partial1.head;

const test3 = new SimpleSinglyLinkedList();
test3.head = new SimpleNode('e');
test3.head.next = new SimpleNode('f');
test3.head.next.next = new SimpleNode('g');
test3.head.next.next.next = new SimpleNode('h');
test3.head.next.next.next.next = partial1.head;

const tests: SimpleSinglyLinkedList[][] = [
	[ test1, test2 ],
	[ test1, test3 ],
	[ test2, test3 ],
	[ test3, test1 ],
	[ test1, test1 ],
	[ test1, partial1 ],
	[ partial1, test2 ],
	[ new SimpleSinglyLinkedList([]), new SimpleSinglyLinkedList([]) ],
	[ new SimpleSinglyLinkedList([ 'a' ]), new SimpleSinglyLinkedList([]) ],
	[ new SimpleSinglyLinkedList([]), new SimpleSinglyLinkedList([ 'a' ]) ],
	[ new SimpleSinglyLinkedList([ 'a' ]), new SimpleSinglyLinkedList([ 'b' ]) ],
	[ new SimpleSinglyLinkedList([ 'a', 'b' ]), new SimpleSinglyLinkedList([ 'c' ]) ],
	[ new SimpleSinglyLinkedList([ 'a' ]), new SimpleSinglyLinkedList([ 'b', 'c' ]) ],
	[ new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd' ]), new SimpleSinglyLinkedList([ 'e', 'f' ]) ],
	[ new SimpleSinglyLinkedList([ 'a', 'b' ]), new SimpleSinglyLinkedList([ 'c', 'd', 'e', 'f' ]) ],
	[ new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd' ]), new SimpleSinglyLinkedList([ 'b', 'c', 'd' ]) ]
];

for(const test of tests) {

	const intersectingNode = getIntersectingNode(test[0], test[1]);
	console.log(`'${test[0]}' <----> '${test[1]}' =====> '${intersectingNode ? intersectingNode.data : '-'}'`);
}
