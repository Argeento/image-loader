class Image {
	constructor (listenerType) {
		this.listenerType = listenerType
		this.isImageLoaded = false
	}
	addEventListener (eventType, callback) {
		if (eventType === this.listenerType) {
			const intervalId = setInterval(() => {
				if (!this.isImageLoaded) return
				clearInterval(intervalId)
				// eslint-disable-next-line standard/no-callback-literal
				callback({ timeStamp: 5 })
			}, 5)
		}
	}

	set src (src) {
		this.isImageLoaded = true
	}
}

export class Image200 extends Image {
	constructor () {
		super('load')
	}
}

export class Image500 extends Image {
	constructor () {
		super('error')
	}
}
