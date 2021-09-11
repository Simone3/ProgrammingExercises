import { Multiple } from './common';
import { kthMultipleV1 } from './v1';
import { kthMultipleV2 } from './v2';
import { kthMultipleV3 } from './v3';

const multipleToString = (multiple: Multiple): string => {

	const aS = String(multiple.a).padStart(3);
	const bS = String(multiple.b).padStart(3);
	const cS = String(multiple.c).padStart(3);
	const sS = String(multiple.exponentSum).padStart(3);
	const vS = String(multiple.value).padStart(25);
	return `{ [${sS}] ${aS} | ${bS} | ${cS} | ${vS} }`;
};

console.log('\n\n**********************\n\n');
for(let k = 1; k < 150000; k++) {

	const kS = String(k).padStart(6);

	const mV1 = kthMultipleV1(k);
	const mV1S = multipleToString(mV1);
	
	const mV2 = kthMultipleV2(k);
	const mV2S = multipleToString(mV2);
	
	const mV3 = kthMultipleV3(k);
	const mV3S = multipleToString(mV3);

	console.log(`${kS} -> V1 = ${mV1S}, V2 = ${mV2S}, V3 = ${mV3S}`);

	if(mV1S !== mV2S || mV1S !== mV3S) {

		throw Error(`Different results!`);
	}
}
