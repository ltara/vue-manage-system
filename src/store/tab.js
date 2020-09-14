export default {
	state: {
		// 菜单数组
		menu: [],
		// 当前菜单
		currentMenu: null,
		// 存放标签，默认已经存放首页标签
		tabList: [
			{
				path: '/',
				label: '首页',
				name: 'home',
				icon: 's-home'
			}
		]
	},
	mutations: {
		selectMenu(state, val) {
			// 判断当前菜单页是否为home页
			if (val.name === 'home') {
				state.currentMenu = null // 如果是home页，点击其他菜单后状态不改变
			} else {
				// 判断tab标签是否已经添加进数组了
				// 如果添加，不进行操作
				let result = state.tabList.findIndex((item) => item.name === val.name)
				if (result === -1) {
					state.currentMenu = val // 如果不是home页，点击其他菜单后状态改变
					state.tabList.push(val) // 如果没有添加，则添加
				}
			}
		},
		// 关闭标签
		closeTab(state, val) {
			// 获取点击的标签再数组中的索引
			let result = state.tabList.findIndex((item) => item.name === val.name)
			// 通过索引删除它
			state.tabList.splice(result, 1)
		}
	},
	actions: {}
}
