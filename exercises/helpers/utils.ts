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
 * Simple helper to generate a random string for test purposes
 * @param length string length
 * @returns the random string
 */
export const randomString = (length: number): string => {

	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	let result = '';
	for(let i = 0; i < length; i++) {

		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
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
