import { subSort } from './v1';

const tests: number[][] = [
	[],

	[ 3 ],

	[ 3, 5 ],
	[ 5, 3 ],

	[ 1, 3, 5 ],
	[ 1, 5, 3 ],
	[ 3, 1, 5 ],
	[ 5, 1, 3 ],
	[ 3, 5, 1 ],
	[ 5, 3, 1 ],

	[ 1, 3, 5, 7, 9, 11, 15, 17, 19, 21 ],

	[ 1, 3, 5, 7, 6, 16, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 2, 20, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 0, 22, 15, 17, 19, 21 ],

	[ 1, 3, 5, 7, 22, 6, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 16, 2, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 20, 0, 15, 17, 19, 21 ],

	[ 1, 3, 5, 7, 6, 12, 8, 10, 16, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 6, 12, 22, 10, 16, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 6, 12, 8, 0, 16, 15, 17, 19, 21 ],

	[ 1, 3, 5, 7, 22, 26, 28, 6, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 16, 2, 15, 17, 19, 21 ],
	[ 1, 3, 5, 7, 20, 0, 15, 17, 19, 21 ],

	[ 1, 22, 5, 7, 20, 0, 15, 17, 2, 21 ],

	[ 1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const result = subSort(test);
	console.log(`[ ${test.join(', ')} ] -> ${result === undefined ? 'already sorted!' : `${result.m} - ${result.n}, i.e. [ ${test.slice(0, result.m).join(', ')} | ${test.slice(result.m, result.n + 1).join(', ')} | ${test.slice(result.n + 1).join(', ')} ]`}`);
}