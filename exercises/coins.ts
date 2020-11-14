const AVAILABLE_COINS = [ 1, 5, 10, 25 ];

/**
 * Recursive helper for getCoinsCombinations()
 * @param price the current number of coins to pay
 * @param availableCoinsIndex current coin index
 * @param combinationSoFar current partial result (all coins)
 * @param combinations all results so far
 */
const getCoinsCombinationsHelper = (price: number, availableCoinsIndex: number, combinationSoFar: number[], combinations: number[][]): void => {

	if(price === 0) {

		combinations.push(combinationSoFar);
		return;
	}
	else if(availableCoinsIndex >= AVAILABLE_COINS.length) {

		return;
	}

	const coin = AVAILABLE_COINS[availableCoinsIndex];
	const maxNumberOfThisCoin = Math.floor(price / coin);
	if(maxNumberOfThisCoin === 0) {

		return;
	}

	const newAvailableCoinsIndex = availableCoinsIndex + 1;

	let newCombinations = [ ...combinationSoFar ];
	for(let numberOfThisCoin = 0; numberOfThisCoin <= maxNumberOfThisCoin; numberOfThisCoin++) {

		const remainingPrice = price - numberOfThisCoin * coin;

		getCoinsCombinationsHelper(remainingPrice, newAvailableCoinsIndex, newCombinations, combinations);

		newCombinations = [ ...newCombinations ];
		newCombinations.push(coin);
	}
};

/**
 * Given an infinite number of quarters (25 cents), dimes (10 cents), nickels (5 cents), and pennies (1 cent), it calculates the number of ways of representing n cents.
 * @param price the number of cents to pay
 * @returns all options with the available coins
 */
export const getCoinsCombinations = (price: number): number[][] => {

	if(price <= 0) {

		return [];
	}
	else {

		const combinations: number[][] = [];
		getCoinsCombinationsHelper(price, 0, [], combinations);
		return combinations;
	}
};

const tests: number[] = [
	0,
	1,
	3,
	4,
	5,
	8,
	10,
	11,
	25
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const combinations = getCoinsCombinations(test);
	console.log(`\n\n####### ${test}`);
	for(const combination of combinations) {

		console.log(combination.join(' + '));
	}
}
