import { MasseuseAppointmentsResult } from './common';

/**
 * Recursive helper for getOptimalMasseuseAppointments
 * @param appointmentRequests the appointment requests
 * @param currentIndex the current index of the array
 * @param currentResult the current result
 * @returns the current best result
 */
const getOptimalMasseuseAppointmentsHelper = (appointmentRequests: number[], currentIndex: number, currentResult: MasseuseAppointmentsResult, memoizedPartialResults: {[key: number]: MasseuseAppointmentsResult}): MasseuseAppointmentsResult => {

	// Check if the partial result starting from "currentIndex" was already computed in previous iterations
	let bestPartialResultStartingFromCurrent = memoizedPartialResults[currentIndex];
	if(!bestPartialResultStartingFromCurrent) {

		// The starting point for the recursions is the current elemement alone (we are starting from scratch every time)
		let startingPointResult = currentResult;
		if(currentIndex >= 0) {
	
			const currentAppointment = appointmentRequests[currentIndex];
	
			startingPointResult = {
				totalMinutes: currentAppointment,
				appointmentIndices: [ currentIndex ],
				appointments: [ currentAppointment ]
			};
		}

		if(currentIndex + 2 < appointmentRequests.length) {

			// Recurse including the next available index (curr + 2)
			const resultWithNextElement = getOptimalMasseuseAppointmentsHelper(appointmentRequests, currentIndex + 2, startingPointResult, memoizedPartialResults);
	
			if(currentIndex + 3 < appointmentRequests.length) {
	
				// Recurse excluding the next available index (curr + 3)
				const resultWithoutNextElement = getOptimalMasseuseAppointmentsHelper(appointmentRequests, currentIndex + 3, startingPointResult, memoizedPartialResults);
					
				// Pick the best result of the two recursions (note that there is no other alternative, because skipping to curr + 4 would certainly be worse than curr + 2 -> curr + 4 (since there are no negative numbers))
				bestPartialResultStartingFromCurrent = resultWithNextElement.totalMinutes > resultWithoutNextElement.totalMinutes ? resultWithNextElement : resultWithoutNextElement;
			}
			else {
	
				// Including the next element is the only option, that's the best result
				bestPartialResultStartingFromCurrent = resultWithNextElement;
			}
		}
		else {
	
			// Cannot recurse anymore, the starting point is the best result
			bestPartialResultStartingFromCurrent = startingPointResult;
		}

		// Save the partial result for later
		memoizedPartialResults[currentIndex] = bestPartialResultStartingFromCurrent;
	}

	// Join current result (previous elements) and new result (current and following elements)
	return {
		totalMinutes: currentResult.totalMinutes + bestPartialResultStartingFromCurrent.totalMinutes,
		appointmentIndices: [ ...currentResult.appointmentIndices, ...bestPartialResultStartingFromCurrent.appointmentIndices ],
		appointments: [ ...currentResult.appointments, ...bestPartialResultStartingFromCurrent.appointments ]
	};
};

/**
 * A popular masseuse receives a sequence of back-to-back appointment requests and is debating which ones to accept.
 * She needs a 15-minute break between appointments and therefore she cannot accept any adjacent requests.
 * Given a sequence of back-to-back appointment requests (all multiples of 15 minutes, none overlap, and none can be moved),
 * this function finds the optimal (highest total booked minutes) set the masseuse can honor.
 * @param appointmentRequests the appointment requests
 * @returns the optimal set of appointments
 *
 * T = O(N)   <--- thanks to memoization we are touching each node more or less once (computing its tree of recursions just once)
 * S = O(N)
 */
export const getOptimalMasseuseAppointmentsV2 = (appointmentRequests: number[]): MasseuseAppointmentsResult => {

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

	return getOptimalMasseuseAppointmentsHelper(appointmentRequests, -2, {
		totalMinutes: 0,
		appointmentIndices: [],
		appointments: []
	}, {});
};
