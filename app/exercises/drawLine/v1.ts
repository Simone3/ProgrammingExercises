/**
 * A monochrome screen is stored as a single array of bytes, allowing eight consecutive pixels to be stored in one byte.
 * The screen has width w, where w is divisible by 8 (that is, no byte will be split across rows).
 * This function draws a horizontal line from (x1, y) to (x2, y)
 * @param screen the array of bytes
 * @param width the width of the screen
 * @param x1 x coordinate of first point
 * @param x2 x coordinate of second point
 * @param y y coordinate of both points
 */
export const drawLine = (screen: Uint8Array, width: number, x1: number, x2: number, y: number): void => {

	const base = y * width;

	if(Math.floor(x1 / 8) === Math.floor(x2 / 8)) {

		// x1 and x2 are both inside the same byte, simply draw the line inside it
		const start = 7 - (x2 % 8);
		const end = 7 - (x1 % 8);
		let value = 0;
		for(let i = start; i <= end; i++) {

			value |= 1 << i;
		}
		screen[base + Math.floor(x1 / 8)] = value;
	}
	else {

		let current = x1;

		// Add if necessary the first partial byte (from x1 till the end of its byte)
		const firstPartial = current % 8;
		if(firstPartial !== 0) {

			let value = 1;
			for(let i = 1; i < 8 - firstPartial; i++) {

				value |= 1 << i;
			}

			screen[base + (current - firstPartial) / 8] = value;

			current += 8 - firstPartial;
		}

		// Add if necessary all full bytes between x1 and x2
		const fullBytes = Math.floor((x2 - current) / 8);
		const offset = current / 8;
		for(let i = 0; i < fullBytes; i++) {

			screen[base + offset + i] = 0b11111111;
			current += 8;
		}

		// Add if necessary the last partial byte (from the beginning of x2's byte to x2 itself)
		const lastPartial = x2 % 8;
		if(lastPartial !== 0) {

			let value = 0;
			for(let i = 7; i >= 7 - lastPartial; i--) {

				value |= 1 << i;
			}

			screen[base + current / 8] = value;
		}
	}
};
