import { Queue, SimpleQueue } from '../../data-structures/queue';

/**
 * A generic employee
 */
export abstract class Employee {

	private _id: string;
	public isFree: boolean;

	public constructor(id: string) {

		this._id = id;
		this.isFree = true;
	}

	public get id(): string {

		return this._id;
	}

	public toString(): string {

		return `{${this._id}, ${this.isFree}}`;
	}
}

/**
 * A responder
 */
export class Responder extends Employee {

	public constructor(id: string) {

		super(id);
	}
}

/**
 * A manager
 */
export class Manager extends Employee {

	public constructor(id: string) {

		super(id);
	}
}

/**
 * A director
 */
export class Director extends Employee {

	public constructor(id: string) {

		super(id);
	}
}

/**
 * The possibile call states
 */
export type CallState = 'HOLDING' | 'TALKING' | 'OVER';

/**
 * A call
 */
export class Call {

	private _id: string;
	private _state: CallState;
	private requiredTalkTimeMs: number;
	private maxHoldingTimeMs: number;
	private holdingTimeout: NodeJS.Timeout;

	public constructor(id: string, requiredTalkTimeMs: number, maxHoldingTimeMs: number) {

		if(requiredTalkTimeMs <= 0 || maxHoldingTimeMs <= 0) {

			throw Error('Invalid time intervals');
		}

		this._id = id;
		this._state = 'HOLDING';
		this.requiredTalkTimeMs = requiredTalkTimeMs;
		this.maxHoldingTimeMs = maxHoldingTimeMs;

		// Start timeout for too much holding (caller stops holding and stops the call)
		this.holdingTimeout = setTimeout(this.onTooMuchHolding.bind(this), this.maxHoldingTimeMs);
	}

	public get id(): string {

		return this._id;
	}

	public get state(): CallState {

		return this._state;
	}

	public set state(state: CallState) {

		if(this._state !== 'OVER') {

			if(state === 'TALKING') {

				// Stop the "too much holding" timeout
				if(this.holdingTimeout) {

					clearTimeout(this.holdingTimeout);
				}

				// Start the "required talk time" timeout
				setTimeout(this.onStopTalking.bind(this), this.requiredTalkTimeMs);
			}

			this._state = state;
		}
	}

	private onTooMuchHolding(): void {

		this._state = 'OVER';
	}

	private onStopTalking(): void {

		this._state = 'OVER';
	}

	public toString(): string {

		return `{${this._id}, ${this._state}, ${this.requiredTalkTimeMs}, ${this.maxHoldingTimeMs}}`;
	}
}

/**
 * A contact center
 */
export class ContactCenter {

	private isOpen: boolean;
	private employees: Employee[];
	private holdingQueue: Queue<Call>;
	private talkingList: { call: Call, employee: Employee }[];
	private isHoldingQueueIntervalRunning: boolean;
	private holdingQueueInterval: NodeJS.Timeout;
	private talkingListInterval: NodeJS.Timeout;

	public constructor(responders: Responder[], managers: Manager[], directors: Director[]) {

		console.log(`${new Date().getTime()}: Contact Center starts`);

		this.isOpen = true;
		this.employees = [ ...responders, ...managers, ...directors ];
		this.holdingQueue = new SimpleQueue();
		this.talkingList = [];

		// Start the "holding queue" polling handler
		this.holdingQueueInterval = setInterval(this.onHoldQueueHandle.bind(this), 10);
		this.isHoldingQueueIntervalRunning = true;

		// Start the "talking queue" polling handler
		this.talkingListInterval = setInterval(this.onTalkingListHandle.bind(this), 10);
	}

	/**
	 * Dispatches a new call to the contact center
	 * @param call the call
	 */
	public dispatchCall(call: Call): void {

		if(!this.isOpen) {

			throw Error('Contact Center is not open');
		}

		// Simply add it to the end of the holding queue
		console.log(`${new Date().getTime()}: call ${call} arrived`);
		this.holdingQueue.add(call);
	}

	/**
	 * Shuts down the concact center (all current calls are handled but it stops receiving new calls)
	 */
	public shutdown(): void {

		console.log(`${new Date().getTime()}: Contact Center is shut down`);
		this.isOpen = false;
	}

	/**
	 * Helper to handle the hold queue
	 */
	private onHoldQueueHandle(): void {

		while(!this.holdingQueue.isEmpty()) {

			const call = this.holdingQueue.peek();

			if(call.state === 'HOLDING') {

				const firstFreeEmployee = this.employees.find(this.isEmployeeFree);
				if(firstFreeEmployee) {

					// Caller is still holding and there's a free employee, start the call
					firstFreeEmployee.isFree = false;
					this.talkingList.push({ call: call, employee: firstFreeEmployee });
					call.state = 'TALKING';
					this.holdingQueue.remove();
					console.log(`${new Date().getTime()}: call ${call} answered by ${firstFreeEmployee}`);
				}
				else {

					// Caller is still holding but there are no free employees, wait for the next round
					console.log(`${new Date().getTime()}: all employees busy, call(s) holding...`);
					break;
				}
			}
			else if(call.state === 'OVER') {

				// Caller stopped the call while holding, simply remove it
				console.log(`${new Date().getTime()}: caller ${call} stopped holding`);
				this.holdingQueue.remove();
			}
			else {

				throw Error('Unrecognized state for call dispatcher');
			}
		}

		// Handle shutdown
		if(!this.isOpen && this.holdingQueue.isEmpty()) {

			clearInterval(this.holdingQueueInterval);
			this.isHoldingQueueIntervalRunning = false;
		}
	}

	/**
	 * Helper to handle the talking list
	 */
	private onTalkingListHandle(): void {

		// Remove a call from the list if it's over
		for(let i = 0; i < this.talkingList.length; i++) {

			if(this.talkingList[i].call.state === 'OVER') {

				console.log(`${new Date().getTime()}: call ${this.talkingList[i].call} is over, employee ${this.talkingList[i].employee} is now free`);
				this.talkingList[i].employee.isFree = true;
				this.talkingList.splice(i, 1);
			}
		}

		// Handle shutdown
		if(!this.isOpen && this.talkingList.length === 0 && !this.isHoldingQueueIntervalRunning) {

			clearInterval(this.talkingListInterval);
		}
	}

	/**
	 * Helper to tell if an employee is free
	 * @param employee the employee
	 * @returns if he or she is free
	 */
	private isEmployeeFree(employee: Employee): boolean {

		return employee.isFree;
	}
}

