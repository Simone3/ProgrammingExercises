import { SparseSearchV1 } from './v1';
import { SparseSearchV2 } from './v2';

const tests = [
	{ list: [], element: 'a' },
	{ list: [ 'a', 'c', 'e', 'g' ], element: 'a' },
	{ list: [ 'a', 'c', 'e', 'g' ], element: 'e' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'e', '', '', 'g', '', '', '', '', '' ], element: 'a' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'e', '', '', 'g', '', '', '', '', '' ], element: 'c' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'e', '', '', 'g', '', '', '', '', '' ], element: 'e' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'e', '', '', 'g', '', '', '', '', '' ], element: 'g' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'e', '', '', 'g', '', '', '', '', '' ], element: 'i' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'e', '', '', 'g', '', '', '', '', '' ], element: 'd' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'e', '', '', 'g', '', '', '', '', '' ], element: '0' },
	{ list: [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ], element: 'a' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'a', 'e', '', '', 'g', '', '', '', '', '' ], element: 'a' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'c', '', '', 'c', '', '', '', '', '' ], element: 'c' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'a', 'a', '', '', 'a', '', '', '', '', '' ], element: 'a' },
	{ list: [ '', '', 'a', '', '', '', '', '', 'c', 'g', '', '', 'g', '', '', '', '', '' ], element: 'g' },
	{ list: [ '', '', '', '', '', '', '', '', '', '', '', '', 'a', '', '', '', '', '' ], element: 'a' }
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	console.log(`[${test.list.join(', ')}] contains ${test.element} -----> V1 = ${new SparseSearchV1().search(test.list, test.element)} | V2 = ${new SparseSearchV2().search(test.list, test.element)}`);
}
