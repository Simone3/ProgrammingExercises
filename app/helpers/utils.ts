/**
 * Checks if the object has the given property
 * @param object the object to check
 * @param property the property to check
 * @returns true if the object has the property
 */
export const hasOwnProperty = <X extends {}, Y extends PropertyKey> (object: X, property: Y): object is X & Record<Y, unknown> => {
	
	return Object.prototype.hasOwnProperty.call(object, property);
};

/**
 * Checks if the object has the given property and that property is a function
 * @param object the object to check
 * @param property the property to check
 * @returns true if the object has the property and that property is a function
 */
export const hasOwnFunctionProperty = <X extends {}, Y extends PropertyKey> (object: X, property: Y): object is X & Record<Y, Function> => {
	
	return hasOwnProperty(object, property) && typeof object[property] === 'function';
};

/**
 * Simple helper to generate a random integer between two integers for test purposes
 * @param min the min number (inclusive)
 * @param max the max number (inclusive)
 * @returns a random integer
 */
export const randomInteger = (min: number, max: number): number => {

	return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Simple helper to generate a random integer array, with values between two integers, for test purposes
 * @param length the array length
 * @param min the min number (inclusive)
 * @param max the max number (inclusive)
 * @returns a random integer array
 */
export const randomIntegerArray = (length: number, min: number, max: number): number[] => {

	const array = [];
	array.length = length;

	for(let i = 0; i < length; i++) {

		array[i] = randomInteger(min, max);
	}

	return array;
};

/**
 * Simple helper to generate a sorted random integer array, with values between two integers, for test purposes
 * @param length the array length
 * @param min the min number (inclusive)
 * @param max the max number (inclusive)
 * @returns a random integer array
 */
export const randomSortedIntegerArray = (length: number, min: number, max: number): number[] => {

	return randomIntegerArray(length, min, max).sort((first, second) => {

		return first - second;
	});
};

/**
 * Simple helper to generate a random string for test purposes
 * @param length string length
 * @param characters optional domain of the string
 * @returns the random string
 */
export const randomString = (length: number, characters?: string): string => {

	if(!characters) {

		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	}

	const charactersLength = characters.length;

	let result = '';
	for(let i = 0; i < length; i++) {

		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
};

/**
 * Simple helper to generate a random string array
 * @param length the array length
 * @param stringLengthMin the min string length (inclusive)
 * @param stringLengthMax the max string length (inclusive)
 * @param characters optional domain of the string
 * @returns a random string array
 */
export const randomStringArray = (length: number, stringLengthMin: number, stringLengthMax: number, characters?: string): string[] => {

	const array = [];
	array.length = length;

	for(let i = 0; i < length; i++) {

		array[i] = randomString(randomInteger(stringLengthMin, stringLengthMax), characters);
	}

	return array;
};

/**
 * Randomly sorts an array
 * @param array the source array
 * @returns a reference to the source array itself
 */
export const randomSort = <T> (array: T[]): T[] => {

	return array.sort(() => {

		return randomInteger(-1, 1);
	});
};

/**
 * Rotates an array
 * @param array the source array
 * @param times the number of rotations (positive = to the right, negative = to the left)
 * @returns a reference to the source array itself
 */
export const rotateArray = <T> (array: T[], times: number): T[] => {

	const length = array.length;

	const helper: T[] = [];

	for(let i = 0; i < length; i++) {

		const newI = times >= 0 ? (i + times) % length : (length + i - (-times % length)) % length;
		helper[newI] = array[i];
	}

	for(let i = 0; i < length; i++) {

		array[i] = helper[i];
	}

	return array;
};

/**
 * Randomly shuffles an array
 * @param array the array
 * @returns a reference to the input array
 */
export const shuffle = <T> (array: T[]): T[] => {
	
	for(let i = 0; i < array.length; i++) {

		const k = randomInteger(0, i);
		const temp = array[k];
		array[k] = array[i];
		array[i] = temp;
	}

	return array;
};

const permutationsHelper = <T> (array: T[], current: T[], result: T[][], picked: boolean[], remaining: number): void => {

	if(remaining === 0) {

		result.push([ ...current ]);
		return;
	}

	const pickedHereMap = new Map();

	for(let i = 0; i < array.length; i++) {

		const value = array[i];
		if(!picked[i] && !pickedHereMap.has(value)) {

			pickedHereMap.set(value, true);

			picked[i] = true;
			current.push(value);
			permutationsHelper(array, current, result, picked, remaining - 1);
			current.pop();
			picked[i] = false;
		}
	}
};

/**
 * Returns all possible permutations of an array (if 2 or more elements are equal, the permutations returned are unique)
 * @param array the array
 * @returns all possible permutations
 */
export const permutations = <T> (array: T[]): T[][] => {
	
	const result: T[][] = [];
	permutationsHelper(array, [], result, [], array.length);
	return result;
};
