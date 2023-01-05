import { randomIntegerArray } from '../../helpers/utils';
import { MasseuseAppointmentsResult } from './common';
import { getOptimalMasseuseAppointmentsV1 } from './v1';
import { getOptimalMasseuseAppointmentsV2 } from './v2';
import { getOptimalMasseuseAppointmentsV3 } from './v3';

const mult15 = (value: number): number => {

	return value * 15;
};

const tests = [
	[],
	[ 15 ],
	[ 15, 30 ],
	[ 30, 15 ],
	[ 15, 30, 45 ],
	[ 15, 45, 15 ],
	[ 30, 15, 60, 75, 45, 15, 15, 45 ],
	[ 15, 15, 15, 15, 15, 15, 15, 15 ],
	[ 15, 15, 15, 15, 15, 15, 15, 15, 15 ],
	[ 15, 15, 60, 15, 15, 15, 15, 15 ],
	[ 15, 15, 15, 60, 15, 15, 15, 15 ],
	[ 60, 15, 15, 15, 15, 15, 15, 15 ],
	[ 15, 15, 15, 15, 15, 15, 15, 60 ],
	[ 150, 15, 15, 150, 15, 15, 150, 15 ],
	[ 30, 15, 30, 15, 30, 15, 30, 15, 30, 15, 30 ],
	[ 30, 15, 30, 15, 15, 30, 15, 15, 30, 15, 30 ],
	[ 30, 15, 30, 15, 30, 15, 15, 30, 15, 15, 30 ],
	[ 30, 15, 15, 30, 15, 15, 30, 15, 15, 30, 15 ],
	[ 30, 15, 15, 30, 15, 30, 15, 30, 15, 15, 30 ],
	[ 30, 15, 15, 30, 15, 15, 30, 15, 30, 15, 30 ],
	[ 15, 30, 15, 30, 15, 15, 15, 15, 15, 15, 30 ],
	[ 15, 30, 15, 15, 30, 15, 15, 15, 15, 15, 15 ],
	[ 15, 30, 15, 15, 15, 30, 15, 15, 30, 30, 30 ],
	[ 15, 30, 15, 15, 15, 30, 30, 30, 15, 15, 15 ],
	[ 15, 30, 15, 15, 15, 15, 15, 30, 15, 15, 15 ],
	[ 15, 30, 30, 30, 15, 15, 15, 15, 30, 15, 15 ],
	randomIntegerArray(3, 1, 4).map(mult15),
	randomIntegerArray(6, 1, 4).map(mult15),
	randomIntegerArray(12, 1, 4).map(mult15)
];

const verifyResult = (result: MasseuseAppointmentsResult, test: number[]): void => {

	if(result.appointmentIndices.length !== result.appointments.length) {

		throw Error('Result is wrong: different array lengths');
	}

	let sum = result.appointments.length > 0 ? result.appointments[0] : 0;

	for(let i = 0, j = 1; j < result.appointments.length; i++, j++) {

		const prevIndex = result.appointmentIndices[i];
		const currIndex = result.appointmentIndices[j];
		const prevAppointment = result.appointments[i];
		const currAppointment = result.appointments[j];

		if(prevIndex < 0 || prevIndex >= test.length || currIndex < 0 || currIndex >= test.length || prevIndex >= currIndex - 1) {

			throw Error(`Result is wrong: indices ${prevIndex} and ${currIndex} are invalid`);
		}

		if(prevAppointment !== test[prevIndex] || currAppointment !== test[currIndex]) {

			throw Error(`Result is wrong: values at ${prevIndex} and at ${currIndex} are invalid`);
		}

		sum += currAppointment;
	}

	if(result.totalMinutes !== sum) {

		throw Error(`Result is wrong: sum is wrong`);
	}
};

console.log('\n\n**********************\n\n');
for(const test of tests) {

	const resultV1 = getOptimalMasseuseAppointmentsV1(test);
	const resultV2 = getOptimalMasseuseAppointmentsV2(test);
	const resultV3 = getOptimalMasseuseAppointmentsV3(test);

	console.log(`\n[ ${test.join(', ')} ] --->\n    V1 = ${resultV1.totalMinutes} with [ ${resultV1.appointmentIndices.join(', ')} ] i.e. [ ${resultV1.appointments.join(', ')} ]\n    V2 = ${resultV2.totalMinutes} with [ ${resultV2.appointmentIndices.join(', ')} ] i.e. [ ${resultV2.appointments.join(', ')} ]\n    V3 = ${resultV3.totalMinutes} with [ ${resultV3.appointmentIndices.join(', ')} ] i.e. [ ${resultV3.appointments.join(', ')} ]`);

	verifyResult(resultV1, test);
	verifyResult(resultV2, test);
	verifyResult(resultV3, test);

	if(resultV1.totalMinutes !== resultV2.totalMinutes || resultV1.totalMinutes !== resultV3.totalMinutes) {

		throw Error('Results are different!');
	}
}
