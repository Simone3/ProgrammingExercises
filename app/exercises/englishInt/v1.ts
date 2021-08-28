
type SingularPluralLangEntry = {
	singular: string,
	plural: string
};

type Lang = {
	minus: string,
	zero: string,
	digits: string[],
	specialTwoDigits: string[],
	tens: string[],
	hundred: SingularPluralLangEntry,
	thousandSuffixes: (SingularPluralLangEntry | undefined)[]
}

const LANG_ENG: Lang = {
	minus: 'Minus',
	zero: 'Zero',
	digits: [
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine'
	],
	specialTwoDigits: [
		'Ten',
		'Eleven',
		'Twelve',
		'Thirteen',
		'Fourteen',
		'Fifteen',
		'Sixteen',
		'Seventeen',
		'Eighteen',
		'Nineteen'
	],
	tens: [
		'Twenty',
		'Thirty',
		'Forty',
		'Fifty',
		'Sixty',
		'Seventy',
		'Eighty',
		'Ninety'
	],
	hundred: { singular: 'Hundred', plural: 'Hundreds' },
	thousandSuffixes: [
		undefined,
		{ singular: 'Thousand', plural: 'Thousands' },
		{ singular: 'Million', plural: 'Millions' },
		{ singular: 'Billion', plural: 'Billions' },
		{ singular: 'Trillion', plural: 'Trillions' },
		{ singular: 'Quadrillion', plural: 'Quadrillions' }
	]
};

/**
 * Transforms an integer between 0 and 9 into the language string
 * @param oneDigit the one-digit integer
 * @param lang the language provider
 * @returns the language string
 */
const oneDigitIntegerToLang = (oneDigit: number, lang: Lang): string => {

	if(oneDigit === 0) {

		return '';
	}
	else {

		return lang.digits[oneDigit - 1];
	}
};

/**
 * Transforms an integer between 10 and 99 into the language string
 * @param twoDigits the two-digits integer
 * @param lang the language provider
 * @returns the language string
 */
const twoDigitsIntegerToLang = (twoDigits: number, lang: Lang): string => {

	if(twoDigits === 0) {

		return '';
	}

	if(twoDigits >= 10 && twoDigits <= 19) {

		// Special case of ten, eleven, etc.
		return lang.specialTwoDigits[twoDigits - 10];
	}
	else {

		// Get the language string of the second digit
		const lastDigit = twoDigits % 10;
		const lastDigitResult = oneDigitIntegerToLang(lastDigit, lang);

		if(twoDigits === lastDigit) {

			// This two-digits integer was actually just a one-digit integer
			return lastDigitResult;
		}
		else {

			// Add the "tens" name (twenty, thirty, etc.) before the last digit name
			const firstDigit = Math.floor(twoDigits / 10);
			const firstDigitResult = lang.tens[firstDigit - 2];
			return lastDigitResult ? `${firstDigitResult} ${lastDigitResult}` : firstDigitResult;
		}
	}
};

/**
 * Transforms an integer between 100 and 999 into the language string
 * @param threeDigits the three-digits integer
 * @param lang the language provider
 * @param suffix the optional suffix at the end
 * @returns the language string
 */
const threeDigitsIntegerToLang = (threeDigits: number, lang: Lang, suffix?: SingularPluralLangEntry): string => {

	if(threeDigits === 0) {

		return '';
	}

	// Get the language string of the second and third digits
	const lastTwoDigits = threeDigits % 100;
	const lastTwoDigitsResult = twoDigitsIntegerToLang(lastTwoDigits, lang);

	let resultWithoutSuffix;
	if(threeDigits === lastTwoDigits) {

		// This three-digits integer was actually just a two-digits integer
		resultWithoutSuffix = lastTwoDigitsResult;
	}
	else {

		// Add the "hundreds" name before the last two digits name
		const firstDigit = Math.floor(threeDigits / 100);
		const firstDigitResultWithoutSuffix = oneDigitIntegerToLang(firstDigit, lang);
		const firstDigitResult = `${firstDigitResultWithoutSuffix} ${firstDigit === 1 ? lang.hundred.singular : lang.hundred.plural}`;
		resultWithoutSuffix = lastTwoDigitsResult ? `${firstDigitResult} ${lastTwoDigitsResult}` : firstDigitResult;
	}

	// Add the optional suffix
	if(suffix) {

		return `${resultWithoutSuffix} ${threeDigits > 1 ? suffix.plural : suffix.singular}`;
	}
	else {

		return resultWithoutSuffix;
	}
};

/**
 * Given any integer, returns the language phrase that describes it (e.g. "One Thousand, Two Hundred Thirty Four")
 * @param integer the integer
 * @param lang the language provider
 * @returns the language string
 */
const integerToLang = (integer: number, lang: Lang): string => {

	if(integer === 0) {

		// Special case of 0
		return lang.zero;
	}

	let result = '';

	// Add the minus prefix if necessary
	if(integer < 0) {

		result += `${lang.minus} `;
		integer = -integer;
	}

	// Loop every "thousand" (each three-digit value in the number)
	const threeDigitsResults = [];
	let thousandSuffixIndex = 0;
	while(integer > 0) {

		// Get the current 100-9999 number and its "thousands suffix" (thousands, millions, etc.)
		const currentThreeDigits = integer % 1000;
		const suffix = lang.thousandSuffixes[thousandSuffixIndex];

		// Compute the phrase for the current three-digits number
		const currentThreeDigitsResult = threeDigitsIntegerToLang(currentThreeDigits, lang, suffix);
		if(currentThreeDigitsResult) {

			threeDigitsResults.push(currentThreeDigitsResult);
		}

		// Continue with the next three-digits number
		integer = Math.floor(integer / 1000);
		thousandSuffixIndex += 1;
	}

	return `${result}${threeDigitsResults.reverse().join(', ')}`;
};

/**
 * Given any integer, returns the English phrase that describes it (e.g. "One Thousand, Two Hundred Thirty Four")
 * @param integer the integer
 * @returns the language string
 */
export const integerToEnglish = (integer: number): string => {

	return integerToLang(integer, LANG_ENG);
};
