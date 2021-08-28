import { SimpleQueue } from '../../data-structures/queue';

export class BinaryTreeNodeWithRandom<T> {

	public id: string;
	public data: T;
	public left: BinaryTreeNodeWithRandom<T> | undefined;
	public right: BinaryTreeNodeWithRandom<T> | undefined;
	public leftCount = 0;
	public rightCount = 0;

	public constructor(id: string, data: T) {

		this.id = id;
		this.data = data;
	}
}

export class BinaryTreeWithRandom<T> {

	public root: BinaryTreeNodeWithRandom<T> | undefined;

	/**
	 * Inserts a new node
	 * T = O(N) (when childOfId is specified)
	 * S = O(log N) for a balanced tree
	 * @param id the node ID (assumed to be unique in the whole tree)
	 * @param data the node payload
	 * @param childOfId optional parent of the new node (if undefined, the node is added in the left-most available place). If the parent node already has children in the given side, they are replaced.
	 * @param childSide optional side for this new child if "childOfId" is specified (defaults to LEFT)
	 */
	public insert(id: string, data: T, childOfId?: string, childSide?: 'LEFT' | 'RIGHT'): void {

		// A parent ID has been specified: find that node, add the new one as its child and increase all its parents counters
		if(childOfId) {

			const rootResult = this.insertChildOfRecursiveHelper(this.root, new BinaryTreeNodeWithRandom(id, data), childOfId, childSide);
			if(rootResult === 'NOT_FOUND') {

				throw Error(`Node ${childOfId} not found`);
			}
		}

		// No parent ID and not root: the new node is simply the root
		else if(!this.root) {

			this.root = new BinaryTreeNodeWithRandom(id, data);
		}

		// No parent ID and we have at least one node: reach the left-most node, add the new one as its child and increase all its parents counters
		else {

			let node = this.root;
			while(node.left) {

				node.leftCount += 1;
				node = node.left;
			}
			node.leftCount += 1;
			node.left = new BinaryTreeNodeWithRandom(id, data);
		}
	}

	/**
	 * Deletes a node
	 * T = O(N)
	 * S = O(log N) for a balanced tree
	 * @param id the node id
	 */
	public delete(id: string): void {

		if(this.root && this.root.id === id) {

			this.root = undefined;
		}
		else {

			const rootResult = this.deleteRecursiveHelper(this.root, id);
			if(rootResult === 'NOT_FOUND') {

				throw Error(`Node ${id} not found`);
			}
		}
	}

	/**
	 * Returns a random node from the tree. All nodes are be equally likely to be chosen.
	 * T = O(log N) for a balanced tree
	 * S = O(log N) for a balanced tree
	 * @returns the random node ID or undefined if the tree is empty
	 */
	public randomNode(): string | undefined {

		if(this.root) {

			return this.randomNodeRecursiveHelper(this.root).id;
		}
		else {

			return undefined;
		}
	}

	/**
	 * Prints the tree as a string
	 * @returns the string representation
	 */
	public toString(): string {

		if(!this.root) {

			return '-';
		}

		let result = '';

		// Init a queue for the nodes
		const nodesQueue = new SimpleQueue<BinaryTreeNodeWithRandom<T>>();
		nodesQueue.add(this.root);

		// Add each node to the queue and print each one
		while(!nodesQueue.isEmpty()) {

			const node = nodesQueue.remove();

			result += `${result ? ' --- ' : ''}${node.data} [${node.leftCount} | ${node.rightCount}]: `;

			result += `${node.left ? node.left.data : '/'}, ${node.right ? node.right.data : '/'}`;
			
			if(node.left) {
				
				nodesQueue.add(node.left);
			}

			if(node.right) {

				nodesQueue.add(node.right);
			}
		}

		return result;
	}

	/**
	 * Recursive helper for insert (childOfId case)
	 * @param currentNode the current node
	 * @param newNode the new node to add
	 * @param parentId the parent ID to find
	 * @param insertSide the insertion side (defaults to LEFT)
	 * @returns NOT_FOUND if parentId was not found in the current subtree, the new child counter otherwise
	 */
	private insertChildOfRecursiveHelper(currentNode: BinaryTreeNodeWithRandom<T> | undefined, newNode: BinaryTreeNodeWithRandom<T>, parentId: string, insertSide?: 'LEFT' | 'RIGHT'): number | 'NOT_FOUND' {
		
		if(currentNode) {

			// Found the parent node, add the new node as its child and set the corresponding count to 1. Stop the recursion by returning the new child counter.
			if(currentNode.id === parentId) {

				if(insertSide === 'RIGHT') {

					currentNode.right = newNode;
					currentNode.rightCount = 1;
				}
				else {

					currentNode.left = newNode;
					currentNode.leftCount = 1;
				}

				return currentNode.leftCount + currentNode.rightCount + 1;
			}
			
			if(currentNode.left) {

				// Recurse on left child and, if the new node was added in its subtree, update the left counter and propagate the new count upwards
				const resultLeft = this.insertChildOfRecursiveHelper(currentNode.left, newNode, parentId, insertSide);
				if(resultLeft !== 'NOT_FOUND') {

					currentNode.leftCount = resultLeft;
					return currentNode.leftCount + currentNode.rightCount + 1;
				}
			}
			
			if(currentNode.right) {

				// Recurse on right child and, if the new node was added in its subtree, update the right counter and propagate the new count upwards
				const resultRight = this.insertChildOfRecursiveHelper(currentNode.right, newNode, parentId, insertSide);
				if(resultRight !== 'NOT_FOUND') {

					currentNode.rightCount = resultRight;
					return currentNode.leftCount + currentNode.rightCount + 1;
				}
			}
		}

		// Parent not found in this subtree, continue the recursion
		return 'NOT_FOUND';
	}

	/**
	 * Recursive helper for delete
	 * @param currentNode the current node
	 * @param targetId the node ID to find
	 * @returns NOT_FOUND if targetId was not found in the current subtree, the new child counter otherwise
	 */
	private deleteRecursiveHelper(currentNode: BinaryTreeNodeWithRandom<T> | undefined, targetId: string): number | 'NOT_FOUND' {
		
		if(currentNode) {

			// Found the target node node, return 0 to tell it parent to remove it
			if(currentNode.id === targetId) {

				return 0;
			}
			
			if(currentNode.left) {

				// Recurse on left child and, if the target element was found in its subtree, remove the left child if necessary, update the left counter and propagate the new count upwards
				const resultLeft = this.deleteRecursiveHelper(currentNode.left, targetId);
				if(resultLeft !== 'NOT_FOUND') {

					if(resultLeft === 0) {

						currentNode.left = undefined;
					}
					currentNode.leftCount = resultLeft;
					return currentNode.leftCount + currentNode.rightCount + 1;
				}
			}
			
			if(currentNode.right) {

				// Recurse on right child and, if the target element was found in its subtree, remove the right child if necessary, update the right counter and propagate the new count upwards
				const resultRight = this.deleteRecursiveHelper(currentNode.right, targetId);
				if(resultRight !== 'NOT_FOUND') {

					if(resultRight === 0) {

						currentNode.right = undefined;
					}
					currentNode.rightCount = resultRight;
					return currentNode.leftCount + currentNode.rightCount + 1;
				}
			}
		}

		// Target not found in this subtree,continue the recursion
		return 'NOT_FOUND';
	}

	/**
	 * Recursive helper for randomNode
	 * @param currentNode the current node
	 * @returns the randomly chosen node
	 */
	private randomNodeRecursiveHelper(currentNode: BinaryTreeNodeWithRandom<T>): BinaryTreeNodeWithRandom<T> {

		// Pick a random number between 1 and the number of nodes in the current subtree (both inclusive)
		const totalNodes = 1 + currentNode.leftCount + currentNode.rightCount;
		const random = Math.floor(Math.random() * totalNodes) + 1;

		if(random === 1) {

			// If value is 1 (happens with 1 / totalNodes probability), return the current node
			return currentNode;
		}
		else if(random <= currentNode.leftCount + 1) {

			// If value is less than leftCount (happens with leftCount / totalNodes probability), find the random node in the left subtree
			return this.randomNodeRecursiveHelper(currentNode.left as BinaryTreeNodeWithRandom<T>);
		}
		else {

			// Otherwise (happens with rightCount / totalNodes probability), find the random node in the right subtree
			return this.randomNodeRecursiveHelper(currentNode.right as BinaryTreeNodeWithRandom<T>);
		}
	}
}
