module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'generator-star-spacing': 'off', // allow async-await
		eqeqeq: 'off', // 不能使用==
		'no-unused-vars': 'off', // 消除未使用的变量
		'no-undef': 'off', // 未使用变量报错
		'no-unreachable': 'off' // 不能执行的代码检测
	}
}
