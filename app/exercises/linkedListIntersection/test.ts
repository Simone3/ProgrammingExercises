import { SimpleNode, SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { getIntersectingNode } from './v1';

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
