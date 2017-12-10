module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		mocha: true,
	},
	extends: 'standard',
	rules: {
		'arrow-parens': 0,
		'generator-star-spacing': 0,
		'no-debugger': 2 ,
		'no-tabs': 0,
		'indent': ['error', 'tab'],
		'template-curly-spacing': ['error', 'always'],
		'handle-callback-err': 0
	},
	globals: {}
}