import { SimpleSinglyLinkedList } from './data-structures/singlyLinkedList';

const tests: SimpleSinglyLinkedList[] = [
	new SimpleSinglyLinkedList([]),
	new SimpleSinglyLinkedList([ 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b' ]),
	new SimpleSinglyLinkedList([ 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f' ]),
	new SimpleSinglyLinkedList([ 'f', 'e', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'd', 'c', 'e', 'f' ]),
	new SimpleSinglyLinkedList([ 'b', 'a', 'c', 'd', 'f', 'e' ]),
	new SimpleSinglyLinkedList([ 'a', 'f', 'c', 'e', 'd', 'b' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]),
	new SimpleSinglyLinkedList([ 'g', 'f', 'e', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'g', 'b', 'a', 'e', 'c', 'f', 'd' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'b', 'c', 'c', 'c' ]),
	new SimpleSinglyLinkedList([ 'b', 'c', 'a', 'c', 'a', 'c' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'a', 'a', 'a', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'a', 'd', 'e', 'a', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'a', 'a', 'a', 'a', 'a' ])
];

for(const test of tests) {

	const original = test.toString();
	test.sort();
	const sorted = test.toString();
	console.log(`'${original}' =====> '${sorted}'`);
}
