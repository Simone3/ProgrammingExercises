import { MasseuseAppointmentsResult } from './common';

/**
 * A popular masseuse receives a sequence of back-to-back appointment requests and is debating which ones to accept.
 * She needs a 15-minute break between appointments and therefore she cannot accept any adjacent requests.
 * Given a sequence of back-to-back appointment requests (all multiples of 15 minutes, none overlap, and none can be moved),
 * this function finds the optimal (highest total booked minutes) set the masseuse can honor.
 * @param appointmentRequests the appointment requests
 * @returns the optimal set of appointments
 *
 * T = O(N)
 * S = O(1)
 */
export const getOptimalMasseuseAppointmentsV3 = (appointmentRequests: number[]): MasseuseAppointmentsResult => {

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
	
	const blankResult: MasseuseAppointmentsResult = {
		totalMinutes: 0,
		appointmentIndices: [],
		appointments: []
	};

	// Keep a memoization cache of only 3 elements
	const memoizedPartialResults = [ blankResult, blankResult, blankResult ];

	// Loop all requests starting from the end
	for(let i = appointmentRequests.length - 1; i >= 0; i--) {

		const currentAppointment = appointmentRequests[i];

		// Last element of the cache is the partial result starting from the element after the next available element (curr + 3)
		const resultWithoutNext = memoizedPartialResults[2];

		// Penultimate element of the cache is the partial result starting from the next available element (curr + 2)
		const resultWithNext = memoizedPartialResults[1];

		// Pick the best of the two (note that there is no other alternative, because skipping to curr + 4 would certainly be worse than curr + 2 -> curr + 4 (since there are no negative numbers))
		const bestFollowingResult = resultWithNext.totalMinutes < resultWithoutNext.totalMinutes ? resultWithoutNext : resultWithNext;

		// Rotate the cache (we won't need curr + 3 in the next iterations) and save the current result at index 0
		memoizedPartialResults[2] = memoizedPartialResults[1];
		memoizedPartialResults[1] = memoizedPartialResults[0];
		memoizedPartialResults[0] = {
			totalMinutes: bestFollowingResult.totalMinutes + currentAppointment,
			appointmentIndices: [ i, ...bestFollowingResult.appointmentIndices ],
			appointments: [ currentAppointment, ...bestFollowingResult.appointments ]
		};
	}

	// Pick the best result among 0 and 1 (i.e. the choice betwewen the first two appointment requests)
	return memoizedPartialResults[0].totalMinutes < memoizedPartialResults[1].totalMinutes ? memoizedPartialResults[1] : memoizedPartialResults[0];
};
