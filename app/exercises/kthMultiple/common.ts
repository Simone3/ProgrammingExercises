export type Multiple = {
	a: number,
	b: number,
	c: number,
	exponentSum: number,
	value: number
};

export const newMultiple = (a: number, b: number, c: number): Multiple => {

	return {
		a,
		b,
		c,
		exponentSum: a + b + c,
		value: Math.pow(3, a) * Math.pow(5, b) * Math.pow(7, c)
	};
};
