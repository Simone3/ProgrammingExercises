/**
 * Linear search implementation
 * T = O(N)
 * S = O(1)
 * @param list the list
 * @param elementToFind the element to search
 * @returns the element index or undefined if not found
 */
export const linearSearch = <T> (list: T[], elementToFind: T): number | undefined => {

	for(let i = 0; i < list.length; i++) {

		if(list[i] === elementToFind) {

			return i;
		}
	}

	return undefined;
};
