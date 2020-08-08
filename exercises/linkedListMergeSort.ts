import { SinglyLinkedList } from './helpers/singlyLinkedList';

const tests: SinglyLinkedList[] = [
	new SinglyLinkedList([]),
	new SinglyLinkedList([ 'a' ]),
	new SinglyLinkedList([ 'a', 'b' ]),
	new SinglyLinkedList([ 'b', 'a' ]),
	new SinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f' ]),
	new SinglyLinkedList([ 'f', 'e', 'd', 'c', 'b', 'a' ]),
	new SinglyLinkedList([ 'a', 'b', 'd', 'c', 'e', 'f' ]),
	new SinglyLinkedList([ 'b', 'a', 'c', 'd', 'f', 'e' ]),
	new SinglyLinkedList([ 'a', 'f', 'c', 'e', 'd', 'b' ]),
	new SinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]),
	new SinglyLinkedList([ 'g', 'f', 'e', 'd', 'c', 'b', 'a' ]),
	new SinglyLinkedList([ 'g', 'b', 'a', 'e', 'c', 'f', 'd' ]),
	new SinglyLinkedList([ 'a', 'a', 'b', 'c', 'c', 'c' ]),
	new SinglyLinkedList([ 'b', 'c', 'a', 'c', 'a', 'c' ]),
	new SinglyLinkedList([ 'a', 'a', 'a', 'a', 'a', 'a' ]),
	new SinglyLinkedList([ 'a', 'b', 'c', 'd', 'e', 'f', 'a' ]),
	new SinglyLinkedList([ 'a', 'b', 'a', 'd', 'e', 'a', 'a' ]),
	new SinglyLinkedList([ 'a', 'a', 'a', 'a', 'a', 'a', 'a' ])
];

for(const test of tests) {

	const original = test.toString();
	test.sort();
	const sorted = test.toString();
	console.log(`'${original}' =====> '${sorted}'`);
}
