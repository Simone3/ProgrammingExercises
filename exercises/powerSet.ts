const getPowerSetHelper = <T> (set: T[], currentResult: T[], startIndex: number): T[][] => {

	let results: T[][] = [];

	for(let i = startIndex; i < set.length; i++) {

		const newResult = [ ...currentResult ];
		newResult.push(set[i]);

		results.push(newResult);

		results = results.concat(getPowerSetHelper(set, newResult, i + 1));
	}

	return results;
};

/**
 * Returns all subsets of a set
 * T = O(N * 2^N)
 * S = O(N * 2^N)
 * @param set the source set
 * @returns all subsets
 */
export const getPowerSet = <T> (set: T[]): T[][] => {

	return getPowerSetHelper(set, [], 0).concat([[]]);
};

const tests: number[][] = [
	[ ],
	[ 0 ],
	[ 0, 1 ],
	[ 0, 1, 2 ],
	[ 0, 1, 2, 3 ],
	[ 0, 1, 2, 3, 4 ],
	[ 0, 1, 2, 3, 4, 5 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const powerSet = getPowerSet(test);
	let powerSetString = '';
	for(const powerSetElement of powerSet) {

		powerSetString += `{${powerSetElement}}, `;
	}

	console.log(`{${test}} -----> {${powerSetString.substr(0, powerSetString.length - 2)}}`);
}
