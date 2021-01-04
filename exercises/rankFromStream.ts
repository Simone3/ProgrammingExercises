import { BinaryTreeNode, SimpleBinaryTreeNode } from './data-structures/tree';
import { randomInteger } from './helpers/utils';

/**
 * Helper type for tree node value
 */
type NodeValue = {
	number: number;
	occurrencesCount: number;
	leftChildrenCount: number;
};

/**
 * Helper class that contains all exercise methods
 */
export class RankFromStreamSolver {

	private tree: BinaryTreeNode<NodeValue> | undefined;

	/**
	 * Tracks a new number of the stream
	 * T = average O(log(N))
	 * @param number the number
	 */
	public track(number: number): void {

		if(this.tree) {

			this.addToTree(number);
		}
		else {

			this.tree = this.initNode(number);
		}
	}

	/**
	 * Gets the rank (all tracked numbers that are <= to the given one)
	 * T = average O(log(N))
	 * @param number the reference number
	 * @returns the rank
	 */
	public getRank(number: number): number {

		let rank = 0;

		let node = this.tree;
		while(node) {

			if(node.data.number === number) {

				// Found the number, add its occurences and left children count and exit
				rank += node.data.occurrencesCount + node.data.leftChildrenCount;
				break;
			}
			else if(node.data.number > number) {

				// Continue traversal on left child without any change in the rank since this node is bigger than the reference
				node = node.leftChild;
			}
			else {

				// Continue traversal on right child and add the current node occurrences and left children count to the rank
				rank += node.data.occurrencesCount + node.data.leftChildrenCount;
				node = node.rightChild;
			}
		}

		return rank;
	}

	/**
	 * Creates a new node
	 * @param number the number
	 * @returns the node
	 */
	private initNode(number: number): BinaryTreeNode<NodeValue> {

		return new SimpleBinaryTreeNode({
			number: number,
			occurrencesCount: 1,
			leftChildrenCount: 0
		});
	}

	/**
	 * Adds a number to the tree, either by creating a new node or by increasing a node occurrences
	 * @param number the number
	 */
	private addToTree(number: number): void {

		let node = this.tree;
		while(node) {

			if(node.data.number === number) {

				// Number is already in the tree, just increase its counter
				node.data.occurrencesCount += 1;
				return;
			}
			else if(node.data.number > number) {

				// New number will go on the left, increase the left children counter
				node.data.leftChildrenCount += 1;

				if(node.leftChild) {

					// Continue traversal on left child
					node = node.leftChild;
				}
				else {

					// Add the new number as the left child
					node.leftChild = this.initNode(number);
					return;
				}
			}
			else if(node.rightChild) {

				// Continue traversal on right child
				node = node.rightChild;
			}
			else {

				// Add the new number as the right child
				node.rightChild = this.initNode(number);
				return;
			}
		}

		throw Error('Node was not added to the tree!');
	}
}

const tests = [
	[ 1, 2, 3 ],
	[ 3, 2, 1 ],
	[ 1, 6, 2, 56, 233, 1, 34, 2 ],
	[ 1, 6, 2, 2, 56, 233, 1, 34, 2, 1, 233 ],
	[ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ]
];

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const solver = new RankFromStreamSolver();

	console.log(`*** Stream: [ ${test.join(', ')} ]`);

	for(const number of test) {

		console.log(`* Adding ${number}`);
		solver.track(number);

		for(const check of test) {

			console.log(`Rank of ${check} is ${solver.getRank(check)}`);
		}
		for(let i = 0; i < 5; i++) {

			const random = randomInteger(1, 20);
			console.log(`Rank of ${random} is ${solver.getRank(random)}`);
		}
	}

	console.log('\n################\n');
}
