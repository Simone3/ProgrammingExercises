import { divide, multiply, subtract } from './v1';

const subtractMultiplyTests = [
	[ 0, 0 ],
	[ 0, 3 ],
	[ 3, 0 ],
	[ 1, 1 ],
	[ 5, 1 ],
	[ 1, 5 ],
	[ 3, 5 ],
	[ 5, 3 ],
	[ 0, -3 ],
	[ -3, 0 ],
	[ -1, 1 ],
	[ 1, -1 ],
	[ -5, 1 ],
	[ -1, 5 ],
	[ 5, -1 ],
	[ 1, -5 ],
	[ -3, 5 ],
	[ -5, 3 ],
	[ 3, -5 ],
	[ 5, -3 ],
	[ -3, -5 ],
	[ -5, -3 ],
	[ 9999, -777 ]
];

const divideTests = [
	[ 0, 0 ],
	[ 0, 3 ],
	[ 3, 0 ],
	[ 1, 1 ],
	[ 5, 5 ],
	[ 5, 1 ],
	[ 9, 3 ],
	[ 999, 3 ],
	[ 0, -3 ],
	[ -3, 0 ],
	[ -1, 1 ],
	[ 1, -1 ],
	[ -1, -1 ],
	[ -5, 5 ],
	[ 5, -5 ],
	[ -5, -5 ],
	[ -5, 1 ],
	[ 5, -1 ],
	[ -5, -1 ],
	[ -9, 3 ],
	[ 9, -3 ],
	[ -9, -3 ],
	[ -999, 3 ]
];

console.log('\n\n**********************\n\n');
for(const test of subtractMultiplyTests) {
	
	const a = test[0];
	const b = test[1];
	const result = subtract(a, b);
	console.log(`${a} - ${b} = ${result} [${a - b === result}]`);
}

console.log('\n\n**********************\n\n');
for(const test of subtractMultiplyTests) {
	
	const a = test[0];
	const b = test[1];
	const result = multiply(a, b);
	console.log(`${a} * ${b} = ${result} [${a * b === result}]`);
}

console.log('\n\n**********************\n\n');
for(const test of divideTests) {
	
	const a = test[0];
	const b = test[1];
	const result = divide(a, b);
	console.log(`${a} / ${b} = ${result} [${a / b === result}]`);
}
