import Loader from './Loader'

export default function imageLoader (...args) {
	const loader = new Loader(...args)
	return loader.fetchImages()
}
