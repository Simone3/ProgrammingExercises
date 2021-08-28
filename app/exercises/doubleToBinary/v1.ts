/**
 * Returns the given double number as a binary string
 * @param num the number (between 0 and 1)
 * @returns the string binary representation
 */
export const doubleToBinary = (num: number): string => {

	if(num <= 0 || num >= 1) {

		return 'ERROR';
	}

	let currentResult = '';
	let currentValue = 0;
	let currentPower = 1;
	for(let i = 1; i <= 31; i++) {

		currentPower *= 0.5;

		const tempValue = currentValue + currentPower;
		if(tempValue === num) {

			return `0.${currentResult}1`;
		}
		else if(tempValue > num) {

			currentResult += '0';
		}
		else {

			currentResult += '1';
			currentValue = tempValue;
		}
	}

	return 'ERROR';
};
