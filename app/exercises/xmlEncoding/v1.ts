/**
 * An XML attribute
 */
export class XmlAttribute {

	public name: string;
	public value: string;

	public constructor(name: string, value: string) {

		this.name = name;
		this.value = value;
	}
	
	/**
	 * Static builder
	 * @param name attribute name
	 * @param value attribute value
	 * @returns the attribute
	 */
	public static b(name: string, value: string): XmlAttribute {

		return new XmlAttribute(name, value);
	}

	public toString(): string {

		return `${this.name}="${this.value}"`;
	}
}

/**
 * An XML element
 */
export class XmlElement {

	public name: string;
	public attributes: XmlAttribute[];
	public children: XmlElement[];
	public value: string | undefined;

	public constructor(name: string) {

		this.name = name;
		this.attributes = [];
		this.children = [];
	}
	
	/**
	 * Static builder
	 * @param name element name
	 * @returns the element
	 */
	public static b(name: string): XmlElement {

		return new XmlElement(name);
	}

	/**
	 * Builder pattern for an attribute
	 * @param name attribute name
	 * @param value attribute value
	 * @returns this element
	 */
	public a(name: string, value: string): XmlElement {

		this.attributes.push(XmlAttribute.b(name, value));
		return this;
	}

	/**
	 * Builder pattern for a child
	 * @param child new child
	 * @returns this element
	 */
	public c(child: XmlElement): XmlElement {

		if(this.value !== undefined) {

			throw Error('Can\'t have children and value at the same time!');
		}

		this.children.push(child);
		return this;
	}

	/**
	 * Builder pattern for the value
	 * @param value the value
	 * @returns this element
	 */
	public v(value: string): XmlElement {

		if(this.children.length > 0) {

			throw Error('Can\'t have children and value at the same time!');
		}

		this.value = value;
		return this;
	}

	public toString(): string {

		const attributes = this.attributes
			.map((attribute) => {
				return attribute.toString();
			})
			.join(' ');

		const children = this.children
			.map((child) => {
				return child.toString();
			})
			.join('');

		const content = children ? children : this.value;

		return `<${this.name}${attributes ? ` ${attributes}` : ''}>${content ? content : ''}</${this.name}>`;
	}
}

/**
 * Since XML is very verbose, you are given a way of encoding it where each tag gets mapped to a pre-defined integer value.
 * The language/grammar is as follows:
 * * Element --> Tag Attributes END Children END
 * * Attribute --> Tag Value
 * * END --> 0
 * * Tag --> some predefined mapping to int
 * * Value --> string value
 */
export class XmlEncoder {

	private root: XmlElement;
	private encodedXml: string;
	private encodingsList: string[];
	private elementsMap: {[key: string]: number};
	private attributesMap: {[key: string]: number};
	
	public constructor(root: XmlElement) {

		this.root = root;
		this.encodedXml = '';
		this.encodingsList = [ '*End*' ];
		this.elementsMap = {};
		this.attributesMap = {};
	}

	/**
	 * Performs the encoding
	 */
	public encode(): void {

		this.encodedXml = this.encodeElement(this.root);
	}

	/**
	 * Retrieves the encodings legend
	 * @returns the encodings list
	 */
	public getEncodingsList(): string[] {

		return this.encodingsList;
	}

	/**
	 * Retrieves the encoding result
	 * @returns the encoding result
	 */
	public getEncodedXml(): string {

		return this.encodedXml;
	}

	/**
	 * Helper to encode an element
	 * @param element the element
	 * @returns the element encoding
	 */
	private encodeElement(element: XmlElement): string {

		const elementId = this.getEncodingId(element.name, this.elementsMap);
		const encodedChildren = this.encodeElementChildren(element);
		const encodedAttributes = this.encodeElementAttributes(element);
		return `${elementId}${encodedAttributes ? ` ${encodedAttributes}` : ''} 0${encodedChildren ? ` ${encodedChildren}` : ''} 0`;
	}

	/**
	 * Helper to encode an element's children or value, if any
	 * @param element the element
	 * @returns the element's children/value encoding
	 */
	private encodeElementChildren(element: XmlElement): string {

		if(element.children.length > 0) {

			return element.children
				.map((child) => {
					return this.encodeElement(child);
				})
				.join(' ');
		}
		else if(element.value) {

			return element.value;
		}
		else {

			return '';
		}
	}

	/**
	 * Helper to encode an element's attributes, if any
	 * @param element the element
	 * @returns the element's attributes encoding
	 */
	private encodeElementAttributes(element: XmlElement): string {

		return element.attributes
			.map((attribute) => {
				return this.encodeAttribute(attribute);
			})
			.join(' ');
	}

	/**
	 * Helper to encode an attribute
	 * @param attribute the attribute
	 * @returns the attribute encoding
	 */
	private encodeAttribute(attribute: XmlAttribute): string {

		const attributeId = this.getEncodingId(attribute.name, this.attributesMap);
		return `${attributeId} ${attribute.value}`;
	}

	/**
	 * Gets or creates an encoding ID
	 * @param name the element/attribute name
	 * @param referenceMap the reference map for cached IDs
	 * @returns the ID
	 */
	private getEncodingId(name: string, referenceMap: {[key: string]: number}): number {

		const existingId = referenceMap[name];
		if(existingId) {

			return existingId;
		}
		else {

			const newId = this.encodingsList.length;
			this.encodingsList.push(name);
			referenceMap[name] = newId;
			return newId;
		}
	}
}
