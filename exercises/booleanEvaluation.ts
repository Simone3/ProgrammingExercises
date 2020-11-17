/**
 * Helper to parse 0 or 1 into a boolean
 * @param value 0 or 1
 * @returns false or true
 */
const parseValue = (value: string): boolean => {

	if(value === '0') {

		return false;
	}
	else if(value === '1') {

		return true;
	}
	else {

		throw Error(`${value} is not a valid value`);
	}
};

/**
 * Computes a boolean operation
 * @param firstValue the first value
 * @param symbol the symbol
 * @param secondValue the second value
 * @returns the result
 */
const getOperationResult = (firstValue: boolean, symbol: string, secondValue: boolean): boolean => {

	switch(symbol) {

		case '|':
			return firstValue || secondValue;
		
		case '&':
			return firstValue && secondValue;

		case '^':
			return (firstValue && !secondValue) || (!firstValue && secondValue);
	
		default:
			throw Error(`${symbol} is not a valid symbol`);
	}
};

/**
 * Helper type for the recursive results
 */
type EvaluationHelperResult = { value: boolean, expression: string };

/**
 * Recursive helper for booleanEvaluation()
 * @param expression the full expression as an array of characters
 * @param start the start of the expression for the current evaluation
 * @param end the end of the expression for the current evaluation
 * @param resultsCache the memoization cache
 * @returns the list of all parenthesizations
 */
const booleanEvaluationHelper = (expression: string[], start: number, end: number, resultsCache: {[key: string]: EvaluationHelperResult[]}): EvaluationHelperResult[] => {

	// Memoization check
	const cacheKey = `${start}-${end}`;
	const cachedResults = resultsCache[cacheKey];
	if(cachedResults) {

		return cachedResults;
	}

	const symbolsNumber = (end - start) / 2;

	if(symbolsNumber === 0) {

		// Single value, just parse it
		const value = expression[start];
		const parsedValue = parseValue(value);
		return [{ value: parsedValue, expression: value }];
	}
	else if(symbolsNumber === 1) {

		// Single operation, just compute it
		const firstValue = expression[start];
		const firstParsedValue = parseValue(firstValue);
		const symbol = expression[start + 1];
		const secondValue = expression[start + 2];
		const secondParsedValue = parseValue(secondValue);
		const operationResult = getOperationResult(firstParsedValue, symbol, secondParsedValue);
		return [{ value: operationResult, expression: `(${firstValue}${symbol}${secondValue})` }];
	}
	else {

		const results: EvaluationHelperResult[] = [];

		// Split the current expression in two parts in all combinations (e.g. for 4 symbols: (0,4), (1,3), (2,2), etc.)
		for(let pivot = 1; pivot <= symbolsNumber; pivot++) {

			// Compute sub-results for left and right parts
			const i = start + pivot * 2;
			const firstSubResults = booleanEvaluationHelper(expression, start, i - 2, resultsCache);
			const symbol = expression[i - 1];
			const secondSubResults = booleanEvaluationHelper(expression, i, end, resultsCache);

			// Merge the sub-results
			for(const firstSubResult of firstSubResults) {

				for(const secondSubResult of secondSubResults) {

					const operationResult = getOperationResult(firstSubResult.value, symbol, secondSubResult.value);
					results.push({ value: operationResult, expression: `(${firstSubResult.expression}${symbol}${secondSubResult.expression})` });
				}
			}
		}

		// Save partial results in cache
		resultsCache[cacheKey] = results;

		return results;
	}
};

/**
 * Given a boolean expression consisting of the symbols 0 (false), 1 (true), & (AND), | (OR), and ^ (XOR), and a desired boolean result value result, this function
 * returns all the ways of parenthesizing the expression such that it evaluates to the result
 * @param expression the expression, as a string
 * @param expectedResult the expected boolean result
 * @returns all ways of parenthesizing the expression
 */
export const booleanEvaluation = (expression: string, expectedResult: boolean): string[] => {

	// Split the expression as an array of characters
	const explodedExpression = expression.split('');
	if(explodedExpression.length < 3 || (explodedExpression.length - 1) % 2 !== 0) {

		throw Error(`${expression} is not a valid expression`);
	}

	// Get all results and pick those that are equal to the result
	const allResults = booleanEvaluationHelper(explodedExpression, 0, expression.length - 1, {});
	return allResults
		.filter((result) => {

			return result.value === expectedResult;
		})
		.map((result) => {

			return result.expression;
		});
};

const tests = [
	'1|0',
	'1&0',
	'1^0',
	'1^0|0|1',
	'0&0&0&1^1|0',
	'0|0|0|0'
];

const expectedValues = [ true, false ];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	for(const expected of expectedValues) {

		const results = booleanEvaluation(test, expected);
		console.log(`'${test}', ${expected} -----> ${results.length} results${results.length > 0 ? `, i.e. ${results.join(' - ')}` : ''}`);
	}
}
