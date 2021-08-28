import { lambdaRandom } from './v1';

const tests = [
	[],
	[ 1 ],
	[ 1, 2 ],
	[ 1, 2, 3 ],
	[ 1, 2, 3, 4 ]
];

const mainTest = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	for(let i = 0; i < 10; i++) {

		console.log(`[ ${test.join(', ')} ] -> [ ${lambdaRandom(test).join(', ')} ]`);
	}
}

console.log(`-----`);

const total = 1000000;
const map: {[key: string]: number} = {};
for(let i = 0; i < total; i++) {

	const subset = lambdaRandom(mainTest);
	const key = subset.join(', ');
	map[key] = map[key] ? map[key] + 1 : 1;
}

const subsets = Object.keys(map);
for(const subset of subsets) {

	console.log(`[ ${subset} ] -> ${map[subset]}`);
}
