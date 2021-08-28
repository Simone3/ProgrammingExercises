/**
 * Swaps two numbers in place (that is, without temporary variables), printing before and after
 * @param first first number
 * @param second second number
 */
export const swapNumbers = (first: number, second: number): void => {

	console.log(`\nOriginal: first = ${first}, second ${second}`);

	first += second;
	second = first - second;
	first -= second;

	console.log(`Swapped: first = ${first}, second ${second}`);
};
