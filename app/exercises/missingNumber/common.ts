import { getBit } from '../../helpers/binary';

export class SpecialInt {

	private readonly value: number;

	public constructor(value: number) {

		if(value < 0 || !Number.isInteger(value)) {

			throw Error(`Invalid value ${value}`);
		}

		this.value = value;
	}

	public getBit(i: number): number {

		return getBit(this.value, i);
	}

	public toString(): string {

		return String(this.value);
	}
}
