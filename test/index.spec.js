import { expect } from 'chai'
import imageLoader from '../src/index'

describe('imageLoader library', () => {
	it('should be a function', () => {
		expect(imageLoader).to.be.a('function')
	})

	it('should return a promise', () => {
		expect(imageLoader()).to.be.a('promise')
	})
})
