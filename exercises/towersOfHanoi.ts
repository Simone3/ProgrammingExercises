import { SimpleStack, Stack } from './data-structures/stack';

/**
 * Helper class to contain all "towers of Hanoi" methods
 */
class TowersOfHanoi {

	private readonly debugMode = true;
	private readonly elementsNumber: number;
	private readonly leftTower: Stack<number> = new SimpleStack();
	private readonly middleTower: Stack<number> = new SimpleStack();
	private readonly rightTower: Stack<number> = new SimpleStack();

	/**
	 * Constructor
	 * @param elementsNumber the number of elements (initial size of left tower)
	 */
	public constructor(elementsNumber: number) {

		if(elementsNumber <= 0) {

			throw Error('Invalid number of elements');
		}

		this.elementsNumber = elementsNumber;

		for(let i = elementsNumber; i > 0; i--) {

			this.leftTower.push(i);
		}
	}

	/**
	 * Solves and prints each step of the solution
	 */
	public solveAndPrintSolution(): void {

		this.printTowers();

		if(this.elementsNumber === 1) {

			// Base case of 1
			this.moveElementAndPrintTowers(this.leftTower, this.rightTower);
		}
		else {

			// General case of N
			this.moveElements(this.elementsNumber, this.leftTower, this.rightTower, this.middleTower);
		}
	}

	/**
	 * Moves the given number of elements from the source tower to the target tower, using the buffer tower as a temporary helper
	 * @param elementsToMove the number of elements to move
	 * @param source source tower
	 * @param target target tower
	 * @param buffer buffer tower
	 */
	private moveElements(elementsToMove: number, source: Stack<number>, target: Stack<number>, buffer: Stack<number>): void {

		if(elementsToMove === 2) {

			// Base case of 2
			this.moveElementAndPrintTowers(source, buffer);
			this.moveElementAndPrintTowers(source, target);
			this.moveElementAndPrintTowers(buffer, target);
		}
		else {

			// General case of N (move N - 1 elements to the buffer tower, then move the N-th element to the target tower and finally move N - 1 elements from the buffer to the target tower)
			this.moveElements(elementsToMove - 1, source, buffer, target);
			this.moveElementAndPrintTowers(source, target);
			this.moveElements(elementsToMove - 1, buffer, target, source);
		}
	}

	/**
	 * Moves an element and prints the new tower situation. In debug mode also checks all towers' correctness.
	 * @param source source tower
	 * @param target target tower
	 */
	private moveElementAndPrintTowers(source: Stack<number>, target: Stack<number>): void {

		target.push(source.pop());

		if(this.debugMode) {

			this.checkTowerCorrectness(this.leftTower);
			this.checkTowerCorrectness(this.middleTower);
			this.checkTowerCorrectness(this.rightTower);
		}

		this.printTowers();
	}

	/**
	 * Prints the current tower situation
	 */
	private printTowers(): void {

		console.log(`\n\nL: ${this.leftTower.toString()}\nM: ${this.middleTower.toString()}\nR: ${this.rightTower.toString()}`);
	}

	/**
	 * Debug helper to validate the algorithm correctness for a tower (no number above a smaller number)
	 * @param tower the tower to check
	 */
	private checkTowerCorrectness(tower: Stack<number>): void {
		
		const supportStack = new SimpleStack<number>();

		let previousValue = 0;
		while(!tower.isEmpty()) {

			const currentValue = tower.pop();
			if(currentValue <= previousValue) {

				throw Error('Algorith is wrong: tower condition violated');
			}
			previousValue = currentValue;
			supportStack.push(currentValue);
		}

		while(!supportStack.isEmpty()) {

			tower.push(supportStack.pop());
		}
	}
}

console.log('\n\n**********************\n\n');
const towersOfHanoi = new TowersOfHanoi(12);
towersOfHanoi.solveAndPrintSolution();
