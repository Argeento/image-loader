/**
 * Try to download an image from URL
 *
 * @param {string} url URL to image
 * @param {class} Image Dependency injection
 * @return {promise} Resolve or reject a Promise based on image status
*/

function fetchImage (url, Image = window && window.Image) {
	const image = new Image()

	const imagePromise = new Promise((resolve, reject) => {
		image.addEventListener('load', event => {
			resolve({
				time: event.timeStamp,
				url
			})
		})

		// eslint-disable-next-line
		image.addEventListener('error', err => {
			const message = `ImageLoader: Cannot load image from "${ url }"`
			reject(new Error(message))
		})
	})

	image.src = url

	return imagePromise
}

export default fetchImage
