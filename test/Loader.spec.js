import 'babel-polyfill'
import { expect } from 'chai'

import { Image200, Image500 } from './mock/Image'
import Loader from '../src/Loader'

describe('Loader', () => {
	describe('constructor', () => {
		it('should return default config if there is no args', () => {
			expect(new Loader().loadFromDOM).to.be.equal(true)
			expect(new Loader().images).to.be.an('array')
		})

		it('should set loadFromDOM if there is no URLs in args', () => {
			expect(new Loader(() => {})).to.have.property('loadFromDOM', true)
			expect(new Loader()).to.have.property('loadFromDOM', true)
		})

		it('should set images if the first arg is a string', () => {
			const url = '/img.jpg'
			expect(new Loader(url).images).to.be.deep.equal([
				{ url, ref: {} }
			])
		})

		it('should set images if the first arg is an array', () => {
			const urls = ['/img.jpg', '/img2.jpg', '/img3.jpg']
			expect(new Loader(urls).images).to.be.deep.equal([
				{ url: urls[0], ref: {} },
				{ url: urls[1], ref: {} },
				{ url: urls[2], ref: {} }
			])
		})

		it('shuild set callback if only callback is passed', () => {
			expect(new Loader(() => 1).callback()).to.be.equal(1)
		})

		it('shuild set callback if thre is URL arg', () => {
			const urls = ['/img.jpg', '/img2.jpg', '/img3.jpg']
			expect(new Loader(urls, () => 1).callback()).to.be.equal(1)
		})
	})

	describe('onImageLoad', () => {
		it('should return its argument', () => {
			const loader = new Loader()
			const imageInfo = {}
			expect(loader.onImageLoad(imageInfo)).to.be.equal(imageInfo)
		})

		it('should increase loadedImages value if there is no image errors', () => {
			const loader = new Loader()
			const imageInfo = { error: false }
			loader.onImageLoad(imageInfo)
			expect(loader.loadedImages).to.be.equal(1)
		})

		it('should not increase loadedImages value if there is an image error', () => {
			const loader = new Loader()
			const imageInfo = { error: true }
			loader.onImageLoad(imageInfo)
			expect(loader.loadedImages).to.be.equal(0)
		})

		it('should call user callback', () => {
			let tmp = false
			const loader = new Loader(() => { tmp = true })
			loader.onImageLoad({})
			expect(tmp).to.be.equal(true)
		})

		it('should pass to the callback status and current loaded image', () => {
			const url = 'url'
			const time = 10
			let tmp = {}

			const imageInfo = { url, time }
			const loader = new Loader('http', (status, loadedImage) => { tmp = { status, loadedImage } })
			loader.onImageLoad(imageInfo)

			expect(tmp).to.have.property('status')
			expect(tmp).to.have.property('loadedImage')

			expect(tmp.status).to.have.property('all', 1)
			expect(tmp.status).to.have.property('loaded', 1)
			expect(tmp.status).to.have.property('percent', 100)

			expect(tmp.loadedImage).to.have.property('url', url)
			expect(tmp.loadedImage).to.have.property('time', time)
		})

		it('should pass to the callback info about loading status', () => {
			let tmp = {}
			const loader = new Loader(['1', '2'], imageInfo => { tmp = imageInfo })
			loader.onImageLoad({})
			expect(tmp).to.have.property('all', 2)
			expect(tmp).to.have.property('loaded', 1)
			expect(tmp).to.have.property('percent', 50)

			loader.onImageLoad({})
			expect(tmp).to.have.property('all', 2)
			expect(tmp).to.have.property('loaded', 2)
			expect(tmp).to.have.property('percent', 100)
		})
	})

	describe('fetchImages', () => {
		it('should call user callback on each image loaded', async () => {
			window.Image = Image200
			const tmp = []
			const loader = new Loader(['1', '2', '3'], imageInfo => tmp.push(imageInfo))
			await loader.fetchImages()
			expect(tmp.length).to.be.equal(3)
		})

		it('should pass correct data to callback', async () => {
			const tmp = []
			const images = new Array(10).fill().map(() => Math.random() + '')

			// HTTP 200 on images
			window.Image = Image200
			const loader200 = new Loader(images, imageInfo => tmp.push(imageInfo))
			await loader200.fetchImages()

			expect(tmp.length).to.be.equal(10)
			expect(tmp[3].loaded).to.be.equal(4)
			expect(tmp[6].percent).to.be.equal(70)
			expect(tmp[1].all).to.be.equal(tmp.length)

			// HTTP 500 on images
			window.Image = Image500
			tmp.length = 0
			const loader500 = new Loader(images, imageInfo => tmp.push(imageInfo))
			await loader500.fetchImages()

			expect(tmp.length).to.be.equal(10)
			expect(tmp[9].loaded).to.be.equal(0)
			expect(tmp[5].percent).to.be.equal(0)
			expect(tmp[0].all).to.be.equal(tmp.length)
		})

		it('should retrun a promise', () => {
			expect(new Loader().fetchImages()).to.be.a('promise')
		})

		it('should resolve to images data object', async () => {
			window.Image = Image200
			const numberOfImages = 15
			const tmp = []
			const images = new Array(numberOfImages).fill().map(() => Math.random() + '')
			const loader = new Loader(images, imageInfo => tmp.push(imageInfo))
			const data = await loader.fetchImages()

			expect(data.length).to.be.equal(numberOfImages)
			data.forEach((imageData, index) => {
				expect(imageData).to.have.property('url', images[index])
				expect(imageData).to.have.property('time', 5)
				expect(imageData).to.have.property('error', false)
			})
		})
	})
})
