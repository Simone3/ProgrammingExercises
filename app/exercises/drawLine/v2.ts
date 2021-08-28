
export const drawLineV2 = (screen: Uint8Array, width: number, x1: number, x2: number, y: number): void => {

	const base = y * width;

	let current = x1;

	while(current <= x2) {

		// Add if necessary all full bytes
		const currentModulo = current % 8;
		if(currentModulo === 0 && x2 - current >= 7) {

			while(x2 - current >= 7) {

				screen[base + current / 8] = 0b11111111;

				current += 8;
			}
		}

		// Add if necessary all partial bytes
		else {

			const x2Modulo = x2 % 8;
			let value = 0;
			const start = Math.floor(current / 8) === Math.floor(x2 / 8) ? 7 - x2Modulo : 0;
			const end = 7 - currentModulo;
			for(let i = start; i <= end; i++) {

				value |= 1 << i;
			}

			screen[base + (current - currentModulo) / 8] = value;

			current += end - start + 1;
		}
	}
};
