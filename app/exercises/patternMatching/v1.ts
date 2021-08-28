/**
 * Helper to check a specific pair of lengths for 'a' pattern and 'b' pattern
 * @param string source string
 * @param pattern the pattern to match
 * @param aLength the length of the 'a' substring
 * @param bLength the length of the 'b' substring
 * @returns true if the pattern matches
 */
const checkPatternMatchingHelper = (string: string, pattern: string, aLength: number, bLength: number): boolean => {

	// Loop all characters of the pattern and, for each, check the corresponding substring in the source string
	let substringStart = 0;
	let substring;
	let aMatch;
	let bMatch;
	for(let i = 0; i < pattern.length; i++) {

		if(pattern[i] === 'a') {

			substring = string.substr(substringStart, aLength);

			if(!aMatch) {

				// First 'a' substring, save the it for the next ones
				aMatch = substring;
			}
			else if(aMatch !== substring) {

				// Current 'a' substring does not match previous 'a' substring, no match
				return false;
			}

			substringStart += aLength;
		}
		else {

			substring = string.substr(substringStart, bLength);

			if(!bMatch) {

				// First 'b' substring, save the it for the next ones
				bMatch = substring;
			}
			else if(bMatch !== substring) {

				// Current 'b' substring does not match previous 'b' substring, no match
				return false;
			}

			substringStart += bLength;
		}
	}

	return true;
};

/**
 * Checks if a string matches the given pattern.
 * The pattern string consists of just the letters a and b, describing a pattern within a string.
 * For example, the string catcatgocatgo matches the pattern aabab (where cat is a and go is b). It also matches patterns like a, ab, and b.
 * @param string source string
 * @param pattern the pattern to match
 * @returns true if the pattern matches
 */
export const checkPatternMatching = (string: string, pattern: string): boolean => {

	if(string.length === 0 || pattern.length === 0) {

		// If the string or the pattern are empty, they match only if both are empty
		return string.length === 0 && pattern.length === 0;
	}
	else if(pattern.length === 1) {

		// A pattern of 1 always matches a non-emtpy string
		return true;
	}

	// Count the number of 'a' and 'b' occurrences
	let aNumber = 0;
	let bNumber = 0;
	for(let i = 0; i < pattern.length; i++) {

		if(pattern[i] === 'a') {

			aNumber += 1;
		}
		else if(pattern[i] === 'b') {

			bNumber += 1;
		}
		else {

			throw Error('Invalid pattern charater');
		}
	}

	let aLength;
	let bLength;
	if(aNumber === 0) {

		// No 'a' occurrences: string matches only if it can be evenly split into equal 'b' patterns
		bLength = string.length / bNumber;
		return Number.isInteger(bLength) && checkPatternMatchingHelper(string, pattern, 0, bLength);
	}
	else if(bNumber === 0) {

		// No 'b' occurrences: string matches only if it can be evenly split into equal 'a' patterns
		aLength = string.length / aNumber;
		return Number.isInteger(aLength) && checkPatternMatchingHelper(string, pattern, aLength, 0);
	}
	else {

		// Try all possible lengths for 'a' pattern
		for(aLength = 1; ; aLength++) {

			// Compute the corresponding 'b' pattern length
			bLength = (string.length - aNumber * aLength) / bNumber;
			if(bLength <= 0) {

				break;
			}

			// Try to match with the current pair of lengths and, if they do, we have found a match
			if(Number.isInteger(bLength) && checkPatternMatchingHelper(string, pattern, aLength, bLength)) {

				return true;
			}
		}

		// No match found with all possible 'a' pattern lengths, there's no match
		return false;
	}
};
