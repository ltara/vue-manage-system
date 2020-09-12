module.exports = {
	devServer: {
		port: 3333,
		open: true
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "~@/assets/scss/_variable.scss";`
			}
		}
	}
}
