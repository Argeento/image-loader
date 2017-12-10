/**
 * Try to download an image from URL
 *
 * @param {string} url URL to image
 * @return {promise} Resolve or reject a Promise based on image status
*/

const addEventListenerStr = 'addEventListener'

function fetchImage (url) {
	const image = new window.Image()

	const imagePromise = new Promise((resolve, reject) => {
		image[addEventListenerStr]('load', event => {
			// imageInfo
			resolve({
				time: event.timeStamp,
				error: false,
				url
			})
		})

		image[addEventListenerStr]('error', err => {
			// imageInfo
			resolve({
				time: null,
				error: true,
				url
			})
		})
	})

	image.src = url

	return imagePromise
}

export default fetchImage
