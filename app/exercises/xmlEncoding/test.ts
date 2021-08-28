import { XmlElement, XmlEncoder } from './v1';

const tests = [
	XmlElement.b('test'),

	XmlElement.b('test')
		.v('My Value'),
	
	XmlElement.b('test')
		.a('attr', 'Attr Value')
		.v('Elem Value'),
	
	XmlElement.b('family').a('lastName', 'McDowell').a('state', 'CA')
		.c(XmlElement.b('person').a('firstName', 'Gayle')
			.v('Some Message')),
	
	XmlElement.b('family').a('lastName', 'McDowell').a('state', 'CA')
		.c(XmlElement.b('person').a('firstName', 'Gayle')
			.v('Some Message'))
		.c(XmlElement.b('person').a('firstName', 'Tony')
			.v('Another Message'))
		.c(XmlElement.b('person').a('firstName', 'Lucy')
			.c(XmlElement.b('pet').a('name', 'Max')
				.v('Pet message'))
			.c(XmlElement.b('pet').a('name', 'Bella')
				.v('Other pet message')))
];

console.log('\n\n**********************\n\n');
for(const test of tests) {
	
	const encoder = new XmlEncoder(test);
	encoder.encode();
	console.log(`${test} ---> "${encoder.getEncodedXml()}" with {${encoder.getEncodingsList()
		.map((value, index) => {
			return `${index} = ${value}`;
		})
		.join(', ')
	}}`);
}
