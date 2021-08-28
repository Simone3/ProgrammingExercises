import { BinaryTreeNode, SimpleBinaryTreeNode } from '../../data-structures/tree';

abstract class NodeData {}

class OperationNode extends NodeData {

	public constructor(public readonly operation: string) {
		super();
	}

	public toString(): string {
		return `Operation[${this.operation}]`;
	}
}

class ValueNode extends NodeData {

	public constructor(public readonly value: number) {
		super();
	}

	public toString(): string {
		return `Value[${this.value}]`;
	}
}

/**
 * Helper to create an operation node
 * @param operation operation code
 * @returns new node
 */
const createOperationNode = (operation: string): BinaryTreeNode<NodeData> => {

	return new SimpleBinaryTreeNode(new OperationNode(operation));
};

/**
 * Helper to create a value node
 * @param value numeric value
 * @returns new node
 */
const createValueNode = (value: number): BinaryTreeNode<NodeData> => {

	return new SimpleBinaryTreeNode(new ValueNode(value));
};

/**
 * Helper to finalize parsing a numeric value, which is added to the tree
 * @param expression the source expression
 * @param operationsTreeLeftmostParent the parent of the new value node
 * @param currentNumericSubstringStart the start of the current number
 * @param currentNumericSubstringLength the length of the current number
 */
const completeParsingNumber = (expression: string, operationsTreeLeftmostParent: BinaryTreeNode<NodeData>, currentNumericSubstringStart: number, currentNumericSubstringLength: number): void => {

	if(currentNumericSubstringLength === 0) {

		throw Error('Invalid empty number');
	}

	// Parse the substring as a number
	const newValue = Number(expression.substr(currentNumericSubstringStart, currentNumericSubstringLength));

	// Add the new value node to its parent
	const newValueNode = createValueNode(newValue);
	operationsTreeLeftmostParent.rightChild = newValueNode;
};

/**
 * Helper to transform a string expression into a binary tree where each node can be either an operation or a value
 * @param expression the source expression
 * @returns the root of the tree
 */
const parseExpression = (expression: string): BinaryTreeNode<NodeData> => {

	if(expression.length === 0) {

		throw Error('Empty expression');
	}

	// Create a dummy operation to avoid "if root is null" check at each iteration
	const dummyOperationNode = createOperationNode('+');
	const dummyValueNode = createValueNode(0);
	dummyOperationNode.leftChild = dummyValueNode;

	// Keep track of the tree root (always an operation node) and the left-most parent (always an operation node)
	let operationsTreeRoot: BinaryTreeNode<NodeData> = dummyOperationNode;
	let operationsTreeLeftmostParent: BinaryTreeNode<NodeData> = dummyOperationNode;

	let currentNumericSubstringStart = 0;
	let currentNumericSubstringLength = 0;
	for(const char of expression) {

		if(char === '0' || char === '1' || char === '2' || char === '3' || char === '4' || char === '5' || char === '6' || char === '7' || char === '8' || char === '9') {

			// Numbers simply increase the counter
			currentNumericSubstringLength += 1;
		}
		else {

			// A non-numeric character was found: the previous number is completed and we can add it to the tree
			completeParsingNumber(expression, operationsTreeLeftmostParent, currentNumericSubstringStart, currentNumericSubstringLength);
			currentNumericSubstringStart += currentNumericSubstringLength + 1;
			currentNumericSubstringLength = 0;

			if(char === '*' || char === '/') {

				// Multiplication and division have high priority: add the new operation as the right child of the tree root
				const newOperationNode = createOperationNode(char);
				newOperationNode.leftChild = operationsTreeRoot.rightChild;
				operationsTreeRoot.rightChild = newOperationNode;
				operationsTreeLeftmostParent = newOperationNode;
			}
			else if(char === '+' || char === '-') {

				// Addition and subtraction have low priority: add the new operation as the new root
				const newOperationNode = createOperationNode(char);
				newOperationNode.leftChild = operationsTreeRoot;
				operationsTreeRoot = operationsTreeLeftmostParent = newOperationNode;
			}
			else {

				throw Error('Invalid character ' || char);
			}
		}
	}

	// Save last number into the tree
	completeParsingNumber(expression, operationsTreeLeftmostParent, currentNumericSubstringStart, currentNumericSubstringLength);

	return operationsTreeRoot;
};

/**
 * Helper that recursively computes the resulting value of a (sub)tree of operations
 * @param operationsTreeNode the current node (operation or value)
 * @returns the result of the (sub)tree
 */
const solveExpression = (operationsTreeNode: BinaryTreeNode<NodeData>): number => {

	if(operationsTreeNode.data instanceof OperationNode) {

		if(!operationsTreeNode.leftChild || !operationsTreeNode.rightChild) {

			throw Error('Malformed expression');
		}

		// Recurse left and right
		const leftChildValue = solveExpression(operationsTreeNode.leftChild);
		const rightChildValue = solveExpression(operationsTreeNode.rightChild);

		// Apply the math
		const operation = operationsTreeNode.data.operation;
		if(operation === '+') {

			return leftChildValue + rightChildValue;
		}
		else if(operation === '-') {

			return leftChildValue - rightChildValue;
		}
		else if(operation === '*') {

			return leftChildValue * rightChildValue;
		}
		else if(operation === '/') {

			return leftChildValue / rightChildValue;
		}
		else {

			throw Error('Invalid operation symbol');
		}
	}
	else if(operationsTreeNode.data instanceof ValueNode) {

		// No need to do anything for a value node
		return operationsTreeNode.data.value;
	}
	else {

		throw Error('Invalid node data class');
	}
};

/**
 * Given an arithmetic expression consisting of positive integers, +, -, * and / (no parentheses), it computes the result
 * T = O(N) where N is the expression length
 * S = O(N)
 * @param expression the source expression
 * @returns the result of the expression
 */
export const calculator = (expression: string): number => {
	
	// First parse the expression into a tree
	const operationsTreeRoot = parseExpression(expression);

	// Then solve the expression using the tree
	return solveExpression(operationsTreeRoot);
};
