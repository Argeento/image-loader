/**
 * Try to download an image from URL
 *
 * @param {string} url URL to image
 * @return {promise} Resolve a Promise based on image status
*/

const ADD_EVENT_LISTENER = 'addEventListener'

function fetchImage (url) {
	const image = new window.Image()

	const imagePromise = new Promise((resolve, reject) => {
		image[ADD_EVENT_LISTENER]('load', event => {
			// imageInfo
			resolve({
				time: Math.round(event.timeStamp),
				error: false,
				url
			})
		})

		image[ADD_EVENT_LISTENER]('error', err => {
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
