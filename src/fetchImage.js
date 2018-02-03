const ADD_EVENT_LISTENER = 'addEventListener'

function fetchImage (image) {
	const imageEl = new window.Image()

	const imagePromise = new Promise((resolve, reject) => {
		imageEl[ADD_EVENT_LISTENER]('load', event => {
			resolve({
				time: Math.round(event.timeStamp),
				error: false,
				image
			})
		})

		imageEl[ADD_EVENT_LISTENER]('error', err => {
			resolve({
				time: null,
				error: true,
				image
			})
		})
	})

	imageEl.src = image.url

	return imagePromise
}

export default fetchImage
