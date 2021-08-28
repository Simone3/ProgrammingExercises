import { SimpleSinglyLinkedList, SinglyLinkedList } from '../../data-structures/singlyLinkedList';
import { sumLinkedLists } from './v1';

const tests: SinglyLinkedList<number>[][] = [
	[ new SimpleSinglyLinkedList<number>([]), new SimpleSinglyLinkedList<number>([]) ],
	[ new SimpleSinglyLinkedList<number>([]), new SimpleSinglyLinkedList<number>([ 1 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 1 ]), new SimpleSinglyLinkedList<number>([]) ],
	[ new SimpleSinglyLinkedList<number>([ 3, 2, 1 ]), new SimpleSinglyLinkedList<number>([]) ],
	[ new SimpleSinglyLinkedList<number>([]), new SimpleSinglyLinkedList<number>([ 3, 2, 1 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 1 ]), new SimpleSinglyLinkedList<number>([ 1 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 5 ]), new SimpleSinglyLinkedList<number>([ 5 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 7 ]), new SimpleSinglyLinkedList<number>([ 9 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 3, 2, 1 ]), new SimpleSinglyLinkedList<number>([ 1 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 3, 2, 1 ]), new SimpleSinglyLinkedList<number>([ 9 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 1, 1, 1 ]), new SimpleSinglyLinkedList<number>([ 9 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 3, 2, 8 ]), new SimpleSinglyLinkedList<number>([ 8 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 3, 2, 1 ]), new SimpleSinglyLinkedList<number>([ 3, 2, 1 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 9, 9, 9 ]), new SimpleSinglyLinkedList<number>([ 1, 0, 0, 1 ]) ],
	[ new SimpleSinglyLinkedList<number>([ 7, 3 ]), new SimpleSinglyLinkedList<number>([ 3, 6 ]) ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`'${test[0]}' + '${test[1]}' =====> '${sumLinkedLists(test[0], test[1])}'`);
}
