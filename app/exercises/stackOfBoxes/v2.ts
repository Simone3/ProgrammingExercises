import { Box } from './common';

/**
 * V2 of the solution (recursive check on array)
 */
export class StackOfBoxesSolverV2 {

	private readonly boxes: Box[] = [];

	/**
	 * Adds a box to the solution
	 * @param box the box
	 */
	public addBox(box: Box): void {

		// Add it to the array sorted by width (could be any of the 3 dimensions): this way we know that it's impossible for [i] to be above [j] in the solution for each i < j
		for(let i = 0; i < this.boxes.length; i++) {

			if(box.width > this.boxes[i].width) {

				this.boxes.splice(i, 0, box);
				return;
			}
		}
		this.boxes.push(box);
	}

	/**
	 * Returns the tallest possible stack of boxes
	 * @returns the tallest possible stack
	 */
	public getTallestPossibleStack(): Box[] {

		if(this.boxes.length <= 1) {

			return [ ...this.boxes ];
		}
		else {

			const heightsCache: Box[][] = [];
			return this.getTallestPossibleStackHelper(0, undefined, heightsCache);
		}
	}

	/**
	 * Returns the list of current boxes as a string
	 * @returns the string representation
	 */
	public toString(): string {

		return `[ ${this.boxes.join(', ')} ]`;
	}

	/**
	 * Recursive helper for getTallestPossibleStack()
	 * @param i current stack
	 * @param previousBase the previous base to check for compatibility
	 * @param solutionsCache memoization helper for solutions (index i is the best solution for the stack with i as the base)
	 * @returns the (current) tallest possible stack
	 */
	private getTallestPossibleStackHelper(i: number, previousBase: Box | undefined, solutionsCache: Box[][]): Box[] {
		
		const thisBox = this.boxes[i];

		if(previousBase && !thisBox.canBeStackedAbove(previousBase)) {

			return [];
		}
		
		if(i === this.boxes.length - 1) {

			return [ this.boxes[i] ];
		}

		if(solutionsCache[i] !== undefined) {

			return solutionsCache[i];
		}

		let bestSolutionAboveThisBox: Box[] = [];
		for(let j = i + 1; j < this.boxes.length; j++) {

			const solutionAboveThisBox = this.getTallestPossibleStackHelper(j, thisBox, solutionsCache);
			if(!bestSolutionAboveThisBox || bestSolutionAboveThisBox.length < solutionAboveThisBox.length) {

				bestSolutionAboveThisBox = solutionAboveThisBox;
			}
		}

		const solutionWithThisBox = [ this.boxes[i] ].concat(bestSolutionAboveThisBox);
		solutionsCache[i] = solutionWithThisBox;

		const nextSolutionWithoutThisBox = this.getTallestPossibleStackHelper(i + 1, previousBase, solutionsCache);

		return solutionWithThisBox.length > nextSolutionWithoutThisBox.length ? solutionWithThisBox : nextSolutionWithoutThisBox;
	}
}
