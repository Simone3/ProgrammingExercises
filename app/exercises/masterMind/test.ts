import { Color, getMasterMindResult } from './v1';

const tests: [ Color[], Color[] ][] = [
	[[ 'R', 'G', 'B', 'Y' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'R', 'G', 'B', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'B', 'G', 'B', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'B', 'B', 'B', 'B' ]],
	[[ 'R', 'G', 'B', 'B' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'B', 'G', 'B', 'B' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'B', 'B', 'B', 'B' ], [ 'R', 'G', 'B', 'Y' ]],
	[[ 'R', 'G', 'B', 'B' ], [ 'R', 'G', 'B', 'B' ]],
	[[ 'B', 'G', 'B', 'B' ], [ 'B', 'G', 'B', 'B' ]],
	[[ 'B', 'B', 'G', 'B' ], [ 'B', 'G', 'B', 'B' ]],
	[[ 'B', 'B', 'B', 'B' ], [ 'B', 'B', 'B', 'B' ]],
	[[ 'B', 'B', 'B', 'B' ], [ 'Y', 'Y', 'Y', 'Y' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'Y', 'B', 'G', 'R' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'Y', 'B', 'G', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'G', 'B', 'G', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'G', 'G', 'G', 'B' ]],
	[[ 'R', 'G', 'B', 'Y' ], [ 'G', 'G', 'R', 'R' ]]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const result = getMasterMindResult(test[0], test[1]);
	console.log(`${test[0].join('')} = ${test[1].join('')} ---> ${result.hits} hit(s), ${result.pseudohits} pseudohit(s)`);
}
