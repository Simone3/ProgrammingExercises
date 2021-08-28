import { getSmallestDifference } from './v1';

const tests = [
	[
		[ ],
		[ ]
	],
	[
		[ 1, 2, 3 ],
		[ ]
	],
	[
		[ ],
		[ 1, 2, 3 ]
	],
	[
		[ 4 ],
		[ 6 ]
	],
	[
		[ 4 ],
		[ 10, 20, 1, 5, 2 ]
	],
	[
		[ 10, 2, 7, 7, 70 ],
		[ 4 ]
	],
	[
		[ 1, 3, 15, 11, 2 ],
		[ 23, 127, 235, 19, 8 ]
	],
	[
		[ 1, 3, 15, 11, 2, 127, 4 ],
		[ 23, 127, 235, 19, 8 ]
	],
	[
		[ 7, 3, 9, 2, 6 ],
		[ 10, 12, 6, 8, 1, 0, 20 ]
	],
	[
		[ 7, 3, 9, 2, -6 ],
		[ 10, -12, 6, 8, 1, 0, 20 ]
	]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {
	
	const firstArray = test[0];
	const firstString = `[ ${firstArray.join(', ')} ]`;
	const secondArray = test[1];
	const secondString = `[ ${secondArray.join(', ')} ]`;
	console.log(`${firstString} & ${secondString} -> ${getSmallestDifference(firstArray, secondArray)}`);
}
