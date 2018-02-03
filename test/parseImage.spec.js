import { expect } from 'chai'
import parseImage from '../src/parseImage'

describe('parseImage function', () => {
	it('should return an object with url property', () => {
		const url = 'url'
		expect(parseImage(url)).to.has.property(url, url)
		expect(parseImage({ url })).to.has.property(url, url)
	})

	it('should return an object with ref property', () => {
		const url = 'url'
		expect(parseImage(url)).to.has.property('ref')
		expect(parseImage({ url })).to.has.property('ref')
	})

	it('should pass ref to created object', () => {
		const url = 'url'
		const ref = { id: 12, element: null }
		const parsedImage = parseImage({ url, ref })

		expect(parsedImage.ref).to.be.equal(ref)
	})

	it('should throw an error on call without arguments', () => {
		expect(parseImage).to.throw()
	})

	it('should throw an error when passend object doest have an url property', () => {
		expect(() => parseImage({})).to.throw()
	})

	it('should throw an error if url is not a string', () => {
		expect(() => parseImage({ url: [] })).to.throw()
		expect(() => parseImage([])).to.throw()
	})
})
