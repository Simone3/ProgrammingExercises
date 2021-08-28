import { clearBit, getBit, setBit } from '../../helpers/binary';

type Holder = { sum: number, carry: boolean };

/**
 * Computes the i-th bit of the sum
 * @param first first number
 * @param second second number
 * @param holder temporary data holder
 * @param i current bit
 */
const computeBit = (first: number, second: number, holder: Holder, i: number): void => {

	const currentFirstBit = getBit(first, i);
	const currentSecondBit = getBit(second, i);

	if(currentFirstBit === 0 && currentSecondBit === 0) {

		if(holder.carry) {

			holder.sum = setBit(holder.sum, i);
		}
		else {

			holder.sum = clearBit(holder.sum, i);
		}

		holder.carry = false;
	}
	else if(currentFirstBit === 1 && currentSecondBit === 1) {

		if(holder.carry) {

			holder.sum = setBit(holder.sum, i);
		}
		else {

			holder.sum = clearBit(holder.sum, i);
		}

		holder.carry = true;
	}
	else if(holder.carry) {

		holder.sum = clearBit(holder.sum, i);
		holder.carry = true;
	}
	else {

		holder.sum = setBit(holder.sum, i);
		holder.carry = false;
	}
};

/**
 * Adds two numbers without using + or any arithmetic operators.
 * Assumes 32-bit integers whose sum is still a valid 32-bit integer.
 * @param first first number
 * @param second second number
 * @returns the sum
 */
export const addWithoutPlusV1 = (first: number, second: number): number => {
	
	const holder: Holder = { sum: 0, carry: false };
	
	computeBit(first, second, holder, 0);
	computeBit(first, second, holder, 1);
	computeBit(first, second, holder, 2);
	computeBit(first, second, holder, 3);
	computeBit(first, second, holder, 4);
	computeBit(first, second, holder, 5);
	computeBit(first, second, holder, 6);
	computeBit(first, second, holder, 7);
	computeBit(first, second, holder, 8);
	computeBit(first, second, holder, 9);
	computeBit(first, second, holder, 10);
	computeBit(first, second, holder, 11);
	computeBit(first, second, holder, 12);
	computeBit(first, second, holder, 13);
	computeBit(first, second, holder, 14);
	computeBit(first, second, holder, 15);
	computeBit(first, second, holder, 16);
	computeBit(first, second, holder, 17);
	computeBit(first, second, holder, 18);
	computeBit(first, second, holder, 19);
	computeBit(first, second, holder, 20);
	computeBit(first, second, holder, 21);
	computeBit(first, second, holder, 22);
	computeBit(first, second, holder, 23);
	computeBit(first, second, holder, 24);
	computeBit(first, second, holder, 25);
	computeBit(first, second, holder, 26);
	computeBit(first, second, holder, 27);
	computeBit(first, second, holder, 28);
	computeBit(first, second, holder, 29);
	computeBit(first, second, holder, 30);
	computeBit(first, second, holder, 31);

	return holder.sum;
};
