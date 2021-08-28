/**
 * An array that does not publicly expose its length
 */
export class Listy {

	private readonly array: number[];

	public constructor(sourceArray: number[]) {

		const negativeValue = sourceArray.find((element) => {
			return element < 0;
		});
		if(negativeValue !== undefined) {
			throw Error('Listy can\'t contain negative numbers');
		}

		this.array = sourceArray;
	}

	public elementAt(index: number): number {

		const value = this.array[index];
		return value === undefined ? -1 : value;
	}

	public toString(): string {

		return `[${this.array.join(', ')}]`;
	}
}
