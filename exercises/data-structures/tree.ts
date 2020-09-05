import { SimpleQueue } from './queue';

/**
 * A tree node (assumed to be acyclical)
 * @template T the data type
 */
export interface TreeNode<T> {

	/**
	 * The node payload
	 */
	data: T;

	/**
	 * The node children
	 */
	children: TreeNode<T>[];

	/**
	 * Prints the tree as a string
	 * @returns the string representation
	 */
	toString(): string;
}

/**
 * Simple implementation of a tree node (assumed to be acyclical)
 * @template T the data type, defaults to string
 */
export class SimpleTreeNode<T = string> implements TreeNode<T> {

	public data: T;
	public children: TreeNode<T>[];

	/**
	 * The constuctor
	 * @param data the node data
	 * @param children the node children, if any
	 */
	public constructor(data: T, children?: TreeNode<T>[]) {

		this.data = data;
		this.children = children || [];
	}

	/**
	 * @override
	 */
	public toString(): string {

		let result = '';

		// Init a queue for the nodes
		const nodesQueue = new SimpleQueue<TreeNode<T>>();
		nodesQueue.add(this);

		// Add each node to the queue and print each one
		while(!nodesQueue.isEmpty()) {

			const node = nodesQueue.remove();

			result += `${result ? ' --- ' : ''}${node.data}: `;

			const childrenCount = node.children.length;
			if(childrenCount === 0) {

				result += '/';
			}
			else {

				for(let i = 0; i < childrenCount; i++) {

					const child = node.children[i];
					result += `${i === 0 ? '' : ', '}${child.data}`;
					nodesQueue.add(child);
				}
			}
		}

		return result;
	}
}

/**
 * A binary tree node (assumed to be acyclical)
 * @template T the data type
 */
export interface BinaryTreeNode<T> {

	/**
	 * The node payload
	 */
	data: T;

	/**
	 * The left child
	 */
	leftChild: BinaryTreeNode<T> | undefined;

	/**
	 * The right child
	 */
	rightChild: BinaryTreeNode<T> | undefined;

	/**
	 * Prints the tree as a string
	 * @returns the string representation
	 */
	toString(): string;
}

/**
 * Simple implementation of a binary tree node (assumed to be acyclical)
 * @template T the data type, defaults to string
 */
export class SimpleBinaryTreeNode<T = string> implements BinaryTreeNode<T> {

	public data: T;
	public leftChild: BinaryTreeNode<T> | undefined;
	public rightChild: BinaryTreeNode<T> | undefined;

	/**
	 * The constuctor
	 * @param data the node data
	 * @param leftChild the left child
	 * @param rightChild the right child
	 */
	public constructor(data: T, leftChild?: BinaryTreeNode<T>, rightChild?: BinaryTreeNode<T>) {

		this.data = data;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
	}

	/**
	 * @override
	 */
	public toString(): string {

		let result = '';

		// Init a queue for the nodes
		const nodesQueue = new SimpleQueue<BinaryTreeNode<T>>();
		nodesQueue.add(this);

		// Add each node to the queue and print each one
		while(!nodesQueue.isEmpty()) {

			const node = nodesQueue.remove();

			result += `${result ? ' --- ' : ''}${node.data}: `;

			result += `${node.leftChild ? node.leftChild.data : '/'}, ${node.rightChild ? node.rightChild.data : '/'}`;
			
			if(node.leftChild) {
				
				nodesQueue.add(node.leftChild);
			}

			if(node.rightChild) {

				nodesQueue.add(node.rightChild);
			}
		}

		return result;
	}
}
