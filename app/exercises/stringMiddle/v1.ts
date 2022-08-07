import { SinglyLinkedList } from '../../data-structures/singlyLinkedList';

/**
 * Returns the character(s) in the middle of a string
 * @param string the source string
 * @returns empty array if empty string, array of length 1 if odd-length string, array of length 2 if even-length string
 */
export const stringMiddle = (string: string): [] | [ string ] | [ string, string ] => {

	const length = string.length;

	if(length === 0) {

		return [];
	}
	else if(length % 2 === 0) {

		const index = length / 2;
		return [ string.charAt(index - 1), string.charAt(index) ];
	}
	else {

		return [ string.charAt((length - 1) / 2) ];
	}
};

/**
 * Returns the character(s) in the middle of a string (passed as a character linked list)
 * @param string the source string
 * @returns empty array if empty string, array of length 1 if odd-length string, array of length 2 if even-length string
 */
export const linkedListMiddle = (string: SinglyLinkedList<string>): [] | [ string ] | [ string, string ] => {

	let length = 0;
	let node = string.head;
	while(node) {

		length += 1;
		node = node.next;
	}
	
	if(length === 0) {

		return [];
	}

	const middleIndex = length % 2 === 0 ? length / 2 : (length - 1) / 2;

	let i = 0;
	let prevChar = '';
	let currChar = '';
	node = string.head;
	while(node) {

		prevChar = currChar;
		currChar = node.data;

		if(i === middleIndex) {

			if(length % 2 === 0) {

				return [ prevChar, currChar ];
			}
			else {
		
				return [ currChar ];
			}
		}

		i += 1;
		node = node.next;
	}

	throw Error('I should never reach this line!');
};

/**
 * Returns the character(s) in the middle of a string (passed as a character linked list) looping it only once
 * @param string the source string
 * @returns empty array if empty string, array of length 1 if odd-length string, array of length 2 if even-length string
 */
export const linkedListMiddleOneLoop = (string: SinglyLinkedList<string>): [] | [ string ] | [ string, string ] => {

	let length = 0;
	let prevChar = '';
	let currChar = '';
	let slowNode = string.head;
	let fastNode = string.head;
	while(fastNode && slowNode) {

		prevChar = currChar;
		currChar = slowNode.data;

		slowNode = slowNode.next;

		if(fastNode.next?.next) {

			length += 2;
			fastNode = fastNode.next.next;
		}
		else {

			length += 1;
			fastNode = fastNode.next;
		}
	}

	if(length === 0) {

		return [];
	}
	else if(length % 2 === 0) {

		return [ prevChar, currChar ];
	}
	else {

		return [ currChar ];
	}
};
