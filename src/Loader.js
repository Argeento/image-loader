import fetchImage from './fetchImage'
import parseImage from './parseImage'
import { isFunction, isString, isArray } from './utils'

class Loader {
	constructor (arg1, arg2) {
		this.loadFromDOM = false
		this.images = []
		this.loadedImages = 0
		this.callback = () => {}

		if (isFunction(arg1) || (!arg1 && !arg2)) this.loadFromDOM = true
		if (isFunction(arg1)) this.callback = arg1
		if (isFunction(arg2)) this.callback = arg2
		if (isString(arg1)) this.images.push(arg1)
		if (isArray(arg1)) this.images.push(...arg1)

		if (this.loadFromDOM) {
			const imagesEl = [...document.querySelectorAll('img')]
			const images = imagesEl.map(img => img.src)

			this.images.push(...images)
		}

		this.images = this.images.map(parseImage)
	}

	onImageLoad (imageInfo) {
		if (!imageInfo.error) this.loadedImages += 1

		this.callback({
			all: this.images.length,
			loaded: this.loadedImages,
			percent: Math.round(100 * this.loadedImages / this.images.length),
			...imageInfo
		})

		return imageInfo
	}

	fetchImages () {
		const attachUserCallback = imagePromise => {
			return imagePromise.then(imageInfo => {
				return this.onImageLoad(imageInfo)
			})
		}

		const imagePromises = this.images
			.map(fetchImage)
			.map(attachUserCallback)

		return Promise.all(imagePromises)
	}
}

export default Loader
