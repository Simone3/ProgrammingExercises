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

const tests = [
	[ 1, 2 ],
	[ 0, 0 ],
	[ -1, 1 ],
	[ 1, 0 ],
	[ 0, 1 ],
	[ 1000, 1 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	swapNumbers(test[0], test[1]);
}
