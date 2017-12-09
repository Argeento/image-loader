import fetchImage from './fetchImage'
import createConfig from './createConfig'

export default function imageLoader (...args) {
	const config = createConfig(...args)

	if (config.loadFromDOM) {
		const imagesEl = [...document.querySelectorAll('img')]
		const urls = imagesEl.map(img => img.src)

		config.images.push(...urls)
	}

	return Promise.all(config.images.map(fetchImage))
}
