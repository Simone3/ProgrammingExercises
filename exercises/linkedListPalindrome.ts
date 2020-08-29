import { Node, SimpleSinglyLinkedList, SinglyLinkedList } from './data-structures/singlyLinkedList';

type RecursiveHelperResult = {

	totalListLength: number;
	currentCheckNode: Node<string>;
	isPalindromeSoFar: boolean;
}

/**
 * Helper for the recursive implementation
 * @param listHead the fixed list head
 * @param currNode the current node
 * @param currNodeIndex the current node index
 * @returns the partial check result, with the helper variables needed for the algorithm
 */
const isLinkedListPalindromeRecursiveHelper = (listHead: Node<string>, currNode: Node<string>, currNodeIndex: number): RecursiveHelperResult => {

	if(currNode.next) {

		// Recursive invocation for the next node
		const recursiveResult = isLinkedListPalindromeRecursiveHelper(listHead, currNode.next, currNodeIndex + 1);
	
		if(currNodeIndex >= Math.ceil(recursiveResult.totalListLength / 2) && recursiveResult.isPalindromeSoFar) {

			// If we are in the second half of the list and the list is a palindrome so far, continue backtracking while checking for equality with the corresponding node
			const nextCheckNode = recursiveResult.currentCheckNode.next as Node<string>;
			return {
				totalListLength: recursiveResult.totalListLength,
				currentCheckNode: nextCheckNode,
				isPalindromeSoFar: nextCheckNode.data === currNode.data
			};
		}
		else {

			// If the list is not a palindrome or we successfully reached the first half of the list, finish the recursive calls stack with the final result
			return recursiveResult;
		}
	}
	else {

		// This is the last node: we now know the total list length and we can backtrack checking for equality starting from the list head
		return {
			totalListLength: currNodeIndex + 1,
			currentCheckNode: listHead,
			isPalindromeSoFar: listHead.data === currNode.data
		};
	}
};

/**
 * Checks if a given list is a palindrome
 * T = O(N)
 * S = O(N)
 * @param list the input list
 * @returns true if it is a palindrome
 */
export const isLinkedListPalindrome = (list: SinglyLinkedList<string>): boolean => {

	if(list.head) {

		return isLinkedListPalindromeRecursiveHelper(list.head, list.head, 0).isPalindromeSoFar;
	}
	else {

		return true;
	}
};

const tests: SimpleSinglyLinkedList[] = [

	new SimpleSinglyLinkedList([]),
	new SimpleSinglyLinkedList([ 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'c', 'b', 'a' ]),

	new SimpleSinglyLinkedList([ 'a', 'b' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'c', 'b', 'b' ]),
	new SimpleSinglyLinkedList([ 'b', 'b', 'c', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'c', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'c', 'a', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'd', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'd', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'c', 'b', 'b' ]),
	new SimpleSinglyLinkedList([ 'b', 'b', 'c', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'a', 'c', 'd', 'c', 'b', 'a' ]),
	new SimpleSinglyLinkedList([ 'a', 'b', 'c', 'd', 'c', 'a', 'a' ])
];

for(const test of tests) {

	console.log(`'${test}' =====> '${isLinkedListPalindrome(test)}'`);
}
