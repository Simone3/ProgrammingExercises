import { SimpleNode, SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { detectLinkedListCycleV2 } from './v2';

const test1 = new SimpleSinglyLinkedList();
test1.head = new SimpleNode('a');
test1.head.next = new SimpleNode('b');
test1.head.next.next = new SimpleNode('c');
test1.head.next.next.next = test1.head.next;

const test2 = new SimpleSinglyLinkedList();
test2.head = new SimpleNode('a');
test2.head.next = new SimpleNode('b');
test2.head.next.next = new SimpleNode('c');
test2.head.next.next.next = test2.head;

const test3 = new SimpleSinglyLinkedList();
test3.head = new SimpleNode('a');
test3.head.next = new SimpleNode('b');
test3.head.next.next = new SimpleNode('c');
test3.head.next.next.next = test3.head.next.next;

const test4 = new SimpleSinglyLinkedList();
test4.head = new SimpleNode('a');
test4.head.next = test4.head;

const test5 = new SimpleSinglyLinkedList();
test5.head = new SimpleNode('a');
test5.head.next = new SimpleNode('b');
test5.head.next.next = new SimpleNode('c');
test5.head.next.next.next = new SimpleNode('d');
test5.head.next.next.next.next = new SimpleNode('e');
test5.head.next.next.next.next.next = new SimpleNode('f');
test5.head.next.next.next.next.next.next = new SimpleNode('g');
test5.head.next.next.next.next.next.next.next = new SimpleNode('h');
test5.head.next.next.next.next.next.next.next.next = new SimpleNode('i');
test5.head.next.next.next.next.next.next.next.next.next = new SimpleNode('j');
test5.head.next.next.next.next.next.next.next.next.next.next = test5.head.next.next;

const test6 = new SimpleSinglyLinkedList();
test6.head = new SimpleNode('a');
test6.head.next = new SimpleNode('b');
test6.head.next.next = new SimpleNode('c');
test6.head.next.next.next = new SimpleNode('d');
test6.head.next.next.next.next = new SimpleNode('e');
test6.head.next.next.next.next.next = new SimpleNode('f');
test6.head.next.next.next.next.next.next = new SimpleNode('g');
test6.head.next.next.next.next.next.next.next = new SimpleNode('h');
test6.head.next.next.next.next.next.next.next.next = new SimpleNode('i');
test6.head.next.next.next.next.next.next.next.next.next = new SimpleNode('j');
test6.head.next.next.next.next.next.next.next.next.next.next = test6.head.next.next.next.next.next.next.next;

const test7 = new SimpleSinglyLinkedList();
test7.head = new SimpleNode('a');
test7.head.next = new SimpleNode('b');
test7.head.next.next = new SimpleNode('c');
test7.head.next.next.next = new SimpleNode('d');
test7.head.next.next.next.next = new SimpleNode('e');
test7.head.next.next.next.next.next = new SimpleNode('f');
test7.head.next.next.next.next.next.next = new SimpleNode('g');
test7.head.next.next.next.next.next.next.next = new SimpleNode('h');
test7.head.next.next.next.next.next.next.next.next = new SimpleNode('i');
test7.head.next.next.next.next.next.next.next.next.next = new SimpleNode('j');
test7.head.next.next.next.next.next.next.next.next.next.next = test7.head;

const tests: SimpleSinglyLinkedList[] = [
	test1,
	test2,
	test3,
	test4,
	test5,
	test6,
	test7,
	new SimpleSinglyLinkedList([]),
	new SimpleSinglyLinkedList([ 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd' ])
];

for(const test of tests) {

	const loopNode = detectLinkedListCycleV2(test);
	console.log(`'${test}' =====> ${loopNode ? loopNode.data : '-'}`);
}
