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
