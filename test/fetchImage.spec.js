import 'babel-polyfill'

import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import fetchImage from '../src/fetchImage'
import { Image200, Image500 } from './mock/Image'

chai.use(chaiAsPromised)

describe('fetchImage function', () => {
	const url = '/example/url/lorempic.jpg'

	it('should return a promise', () => {
		const imagePromise = fetchImage('example/url', Image200)
		expect(imagePromise).to.be.a('promise')
	})

	it('should resolve on load', async () => {
		const imagePromise = fetchImage(url, Image200)
		await expect(imagePromise).to.be.not.rejected
	})

	it('should resolve to info object', async () => {
		const infoObject200 = await fetchImage(url, Image200)
		expect(infoObject200.time).to.a('number')
		expect(infoObject200.url).to.be.equal(url)
	})

	it('should reject on loading error', async () => {
		const imagePromise = fetchImage(url, Image500)
		await expect(imagePromise).to.be.rejected
	})

	it('should reject to error', async () => {
		const infoObject500 = await expect(fetchImage(url, Image500)).to.be.rejected
		expect(infoObject500).to.be.an('error')
	})
})
