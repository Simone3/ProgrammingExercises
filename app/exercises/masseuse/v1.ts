import { MasseuseAppointmentsResult } from './common';

/**
 * Recursive helper for getOptimalMasseuseAppointments
 * @param appointmentRequests the appointment requests
 * @param currentIndex the current index of the array
 * @param currentResult the current result
 * @returns the current best result
 */
const getOptimalMasseuseAppointmentsHelper = (appointmentRequests: number[], currentIndex: number, currentResult: MasseuseAppointmentsResult): MasseuseAppointmentsResult => {

	// Base case: end of array
	if(currentIndex >= appointmentRequests.length) {

		return currentResult;
	}

	const currentAppointment = appointmentRequests[currentIndex];

	// Recurse including this element in the result
	const resultWithCurrentElement = getOptimalMasseuseAppointmentsHelper(appointmentRequests, currentIndex + 2, {
		totalMinutes: currentResult.totalMinutes + currentAppointment,
		appointmentIndices: [ ...currentResult.appointmentIndices, currentIndex ],
		appointments: [ ...currentResult.appointments, currentAppointment ]
	});

	// Recurse excluding this element in the result
	const resultWithoutCurrentElement = getOptimalMasseuseAppointmentsHelper(appointmentRequests, currentIndex + 1, currentResult);

	// Pick the best result of the two recursions
	return resultWithCurrentElement.totalMinutes > resultWithoutCurrentElement.totalMinutes ? resultWithCurrentElement : resultWithoutCurrentElement;
};

/**
 * A popular masseuse receives a sequence of back-to-back appointment requests and is debating which ones to accept.
 * She needs a 15-minute break between appointments and therefore she cannot accept any adjacent requests.
 * Given a sequence of back-to-back appointment requests (all multiples of 15 minutes, none overlap, and none can be moved),
 * this function finds the optimal (highest total booked minutes) set the masseuse can honor.
 * @param appointmentRequests the appointment requests
 * @returns the optimal set of appointments
 *
 * T = O(2^N)
 * S = O(N)
 */
export const getOptimalMasseuseAppointmentsV1 = (appointmentRequests: number[]): MasseuseAppointmentsResult => {

	if(appointmentRequests.length === 0) {

		return {
			totalMinutes: 0,
			appointmentIndices: [],
			appointments: []
		};
	}

	if(appointmentRequests.length === 1) {

		return {
			totalMinutes: appointmentRequests[0],
			appointmentIndices: [ 0 ],
			appointments: [ appointmentRequests[0] ]
		};
	}

	return getOptimalMasseuseAppointmentsHelper(appointmentRequests, 0, {
		totalMinutes: 0,
		appointmentIndices: [],
		appointments: []
	});
};
