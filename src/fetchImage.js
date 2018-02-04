const ADD_EVENT_LISTENER = 'addEventListener'

function fetchImage (image) {
	const imageEl = new window.Image()

	const imagePromise = new Promise((resolve, reject) => {
		imageEl[ADD_EVENT_LISTENER]('load', event => {
			resolve({
				time: Math.round(event.timeStamp),
				error: false,
				url: image.url,
				ref: image.ref
			})
		})

		imageEl[ADD_EVENT_LISTENER]('error', err => {
			resolve({
				time: null,
				error: true,
				url: image.url,
				ref: image.ref
			})
		})
	})

	imageEl.src = image.url

	return imagePromise
}

export default fetchImage
