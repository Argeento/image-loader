import { isObject, isString } from './utils'

export default function parseImage (image) {
	if (!image) {
		throw new Error('No arguments have passed to parseImage function')
	}

	if (isObject(image) && !image.url) {
		throw new Error('Image object must have an url property')
	}

	const url = isObject(image) ? image.url : image
	const ref = image.ref || {}

	if (!isString(url)) {
		throw new Error('Image url must be a string')
	}

	return { url, ref }
}
