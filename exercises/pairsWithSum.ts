/**
 * Finds all pairs of integers within an array which sum to a specified value
 * @param array source array
 * @param sum required sum
 * @returns all pairs of array indices, if any
 */
export const pairsWithSum = (array: number[], sum: number): [ number, number ][] => {
	
	const result: [ number, number ][] = [];

	// Keep a { array value -> indices for the value } map
	const valuesMap: {[key: number]: number[]} = {};

	for(let i = 0; i < array.length; i++) {

		// If the complementary value is in the map, add all pairs of indices to the result
		const value = array[i];
		const complementaryValue = sum - value;
		const complementaryValueIndices = valuesMap[complementaryValue];
		if(complementaryValueIndices !== undefined) {

			for(const j of complementaryValueIndices) {

				result.push([ j, i ]);
			}
		}

		// Save the current value in the map
		const valueIndices = valuesMap[value];
		if(valueIndices === undefined) {

			valuesMap[value] = [ i ];
		}
		else {

			valueIndices.push(i);
		}
	}

	return result;
};

console.log('\n\n**********************\n\n');

const tests = [
	{ array: [ ], sum: 5 },
	{ array: [ 2, 4, 3, 7 ], sum: 5 },
	{ array: [ 1, 3, -6, 7, 11, 1, 2 ], sum: 5 },
	{ array: [ 1, 1, 1, 4, 1, 1, 1, 4, 1 ], sum: 5 },
	{ array: [ 0, 0, 0, 0, 0, 0, 0 ], sum: 0 },
	{ array: [ 1, 2, 3, 4, 5, 6, 7 ], sum: 0 }
];

for(const test of tests) {

	console.log(`[ ${test.array.join(', ')} ] with sum ${test.sum} -> [ ${pairsWithSum(test.array, test.sum).map((indices) => {
		return `[ ${indices.join(', ')} ]`;
	}).join(', ')} ]`);
}

