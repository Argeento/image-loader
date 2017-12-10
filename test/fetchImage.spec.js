import 'babel-polyfill'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import fetchImage from '../src/fetchImage'
import { Image200, Image500 } from './mock/Image'

chai.use(chaiAsPromised)

describe('fetchImage function', () => {
	const url = '/example/url/lorempic.jpg'

	it('should return a promise', () => {
		window.Image = Image200
		const imagePromise = fetchImage('example/url')
		expect(imagePromise).to.be.a('promise')
	})

	it('should resolve on load', async () => {
		window.Image = Image200
		const imagePromise = fetchImage(url)
		await expect(imagePromise).to.be.not.rejected
	})

	it('should resolve on loading error', async () => {
		window.Image = Image500
		const imagePromise = fetchImage(url)
		await expect(imagePromise).to.be.not.rejected
	})

	it('should resolve to info object', async () => {
		window.Image = Image200
		const infoObject200 = await fetchImage(url)
		expect(infoObject200.time).to.a('number')
		expect(infoObject200.url).to.be.equal(url)

		window.Image = Image500
		const infoObject500 = await fetchImage(url)
		expect(infoObject500.time).to.be.equal(null)
		expect(infoObject500.url).to.be.equal(url)
	})
})
