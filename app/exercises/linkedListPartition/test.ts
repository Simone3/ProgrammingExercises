import { SimpleSinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { linkedListPartition } from './v1';

const tests: SimpleSinglyLinkedList<number>[] = [
	new SimpleSinglyLinkedList<number>([]),
	new SimpleSinglyLinkedList<number>([ 1 ]),
	new SimpleSinglyLinkedList<number>([ 1, 2 ]),
	new SimpleSinglyLinkedList<number>([ 5 ]),
	new SimpleSinglyLinkedList<number>([ 1, 5 ]),
	new SimpleSinglyLinkedList<number>([ 5, 1 ]),
	new SimpleSinglyLinkedList<number>([ 4, 1, 7, 9, 2, 3, 8, 8, 8, 10 ]),
	new SimpleSinglyLinkedList<number>([ 4, 5, 1, 7, 9, 2, 3, 8, 8, 8, 5, 10 ]),
	new SimpleSinglyLinkedList<number>([ 5, 5, 5, 1, 5, 5, 5, 5 ]),
	new SimpleSinglyLinkedList<number>([ 5, 5, 5, 7, 5, 5, 5, 5 ])
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const original = test.toString();
	linkedListPartition(test, 5);
	const partitioned = test.toString();
	console.log(`'${original}' =====> '${partitioned}'`);
}
