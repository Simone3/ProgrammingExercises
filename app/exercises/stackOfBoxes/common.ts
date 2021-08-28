/**
 * A box
 */
export class Box {

	public readonly width: number;
	public readonly height: number;
	public readonly depth: number;

	/**
	 * Constructor
	 * @param width width
	 * @param height height
	 * @param depth depth
	 */
	public constructor(width: number, height: number, depth: number) {

		if(width <= 0 || height <= 0 || depth <= 0) {

			throw Error('Invalid box');
		}

		this.width = width;
		this.height = height;
		this.depth = depth;
	}

	/**
	 * Checks if this box can be stacked on top of the given box
	 * @param bottomBox the box to check
	 * @returns true if this box can be stacked on top of the given box
	 */
	public canBeStackedAbove(bottomBox: Box): boolean {

		return this.width < bottomBox.width && this.height < bottomBox.height && this.depth < bottomBox.depth;
	}

	/**
	 * Returns the box as a string
	 * @returns the string representation
	 */
	public toString(): string {

		return `{${this.width}, ${this.height}, ${this.depth}}`;
	}
}
