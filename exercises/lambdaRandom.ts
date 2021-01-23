import { randomInteger } from './helpers/utils';

/**
 * Using Lambda expressions, it returns a random subset of arbitrary size of a list.
 * All subsets (including the empty set) should be equally likely to be chosen.
 * @param list the source set
 * @returns the random subset
 */
export const lambdaRandom = (list: number[]): number[] => {

	// Simply pick each element with a 50% chance, since for each element i half of all subsets contain element i
	return list.filter(() => {

		return randomInteger(0, 1) === 0;
	});
};

const tests = [
	[],
	[ 1 ],
	[ 1, 2 ],
	[ 1, 2, 3 ],
	[ 1, 2, 3, 4 ]
];

const mainTest = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

console.log(`******************`);
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
