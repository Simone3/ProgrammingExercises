import { SimpleNode, SimpleSinglyLinkedList, SinglyLinkedList } from './data-structures/singlyLinkedList';

const tests: SinglyLinkedList<string>[] = [
	new SimpleSinglyLinkedList([]),
	new SimpleSinglyLinkedList([ 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f' ])
];

const additionalTest = new SimpleSinglyLinkedList();
additionalTest.head = new SimpleNode('a');
additionalTest.head.next = new SimpleNode('b');
additionalTest.head.next.next = new SimpleNode('c');
additionalTest.head.next.next.next = new SimpleNode('d');
tests.push(additionalTest);

for(const test of tests) {

	const toString = test.toString();
	const length = test.length();
	console.log(`${toString} ${' '.repeat(30 - toString.length)} [length: ${length}]`);
}
