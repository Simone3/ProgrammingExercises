import { randomInteger, randomString } from '../../helpers/utils';
import { Call, ContactCenter, Director, Manager, Responder } from './v1';

const responders = [ new Responder('R1'), new Responder('R2'), new Responder('R3'), new Responder('R4') ];
const managers = [ new Manager('M1'), new Manager('M2') ];
const directors = [ new Director('D1') ];
const contactCenter = new ContactCenter(responders, managers, directors);

let callsNumber = 100;
const testCall = (): void => {

	contactCenter.dispatchCall(new Call(randomString(10), randomInteger(50, 4000), randomInteger(50, 4000)));
	callsNumber -= 1;

	if(callsNumber) {

		setTimeout(testCall, randomInteger(50, 1000));
	}
	else {

		contactCenter.shutdown();
	}
};
testCall();
