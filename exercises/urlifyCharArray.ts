/**
 * Replaces all internal spaces (assuming only ' ' simplicity) in the input character array (assuming ASCII characters) with %20. Trims starting and ending spaces.
 * T = O(N)
 * S = O(1)
 * @param input the input character array
 */
export const urlifyCharArray = (input: string[]): void => {

	// No need to do anything if empty array
	if(input.length === 0) {

		return;
	}

	// First loop to count internal spaces and real characters, while trimming starting or ending spaces
	let realInputStart = 0;
	let realInputEnd = input.length - 1;
	let realCharsCount = 0;
	let tempSpacesCount = 0;
	let spacesCount = 0;
	let firstRealChar = true;
	for(let i = 0; i < input.length; i++) {

		const char = input[i];

		if(char === ' ') {

			tempSpacesCount += 1;
		}
		else {

			if(firstRealChar) {

				realInputStart = i;
				tempSpacesCount = 0;
				firstRealChar = false;
			}
			else {

				spacesCount += tempSpacesCount;
				tempSpacesCount = 0;
			}
			
			realCharsCount += 1;
			realInputEnd = i;
		}
	}

	// Set array length to 0 if no real characters (= just spaces)
	if(realCharsCount === 0) {

		input.length = 0;
		return;
	}

	// Shift array for trimming
	if(realInputStart !== 0 || realInputEnd !== input.length - 1) {

		if(realInputStart !== 0) {

			for(let i = 0, j = realInputStart; j <= realInputEnd; i++, j++) {

				input[i] = input[j];
			}
		}

		input.length = realInputEnd + 1 - realInputStart;
	}

	// If no internal spaces, it's done (= just trimmed if necessary)
	if(spacesCount === 0) {

		return;
	}

	// Second loop (backwards) to add all space encodings
	const totalFinalLength = realCharsCount + 3 * spacesCount;
	for(let i = input.length - 1, j = totalFinalLength - 1; i >= 0; i--, j--) {

		const char = input[i];

		if(char === ' ') {

			input[j] = '0';
			j -= 1;
			input[j] = '2';
			j -= 1;
			input[j] = '%';
		}
		else {

			if(i === j) {

				break;
			}

			input[j] = input[i];
		}
	}
	input.length = totalFinalLength;
};

const tests: string[][] = [
	[ ],
	[ 'a', 'b' ],
	[ 'a', ' ', 'b' ],
	[ 'a', ' ', 'b', ' ', 'c' ],
	[ 'a', ' ', 'b', ' ', ' ', ' ', 'c' ],
	[ ' ', ' ', 'a', ' ', 'b', ' ', 'c' ],
	[ 'a', ' ', 'b', ' ', 'c', ' ', ' ', ' ' ],
	[ ' ', 'a', ' ', 'b', ' ', 'c', ' ', ' ' ],
	[ ' ', ' ', 'a', 'b', ' ', 'c' ],
	[ 'a', ' ', 'b', 'c', ' ', ' ', ' ' ],
	[ ' ', 'a', 'b', 'c', ' ', ' ' ],
	[ ' ', 'a', ' ', ' ', ' ', 'b', ' ', 'c', ' ', ' ' ],
	[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'a', ' ', 'b' ],
	[ 'a', ' ', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
	[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'a', 'b' ],
	[ 'a', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ]
];

for(const test of tests) {

	const original = test.join('');
	urlifyCharArray(test);
	const modified = test.join('');
	console.log(`'${original}' -> '${modified}'`);
}
