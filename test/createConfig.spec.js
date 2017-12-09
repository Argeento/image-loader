import { expect } from 'chai'

import createConfig from '../src/createConfig'

describe('createConfig', () => {
	it('should return default config if there is no args', () => {
		expect(createConfig().loadFromDOM).to.be.equal(true)
		expect(createConfig().images).to.be.an('array')
	})

	it('should set loadFromDOM if there is no URLs in args', () => {
		expect(createConfig(() => {})).to.have.property('loadFromDOM', true)
		expect(createConfig()).to.have.property('loadFromDOM', true)
	})

	it('should set images if the first arg is a string', () => {
		const url = '/img.jpg'
		expect(createConfig(url).images).to.be.deep.equal([url])
	})

	it('should set images if the first arg is an array', () => {
		const urls = ['/img.jpg', '/img2.jpg', '/img3.jpg']
		expect(createConfig(urls).images).to.be.deep.equal(urls)
	})

	it('shuild set callback if only callback is passed', () => {
		expect(createConfig(() => 1).callback()).to.be.equal(1)
	})

	it('shuild set callback if thre is URL arg', () => {
		const urls = ['/img.jpg', '/img2.jpg', '/img3.jpg']
		expect(createConfig(urls, () => 1).callback()).to.be.equal(1)
	})
})
