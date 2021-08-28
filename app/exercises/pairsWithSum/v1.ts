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
