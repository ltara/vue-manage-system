import Cookie from 'js-cookie'

export default {
  state: {
    // 当前菜单
    currentMenu: null,
    // 侧边栏是否折叠
    isCollapse: false,
    // 菜单数组
    menu: [],
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
    // 登录时设置menu
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 退出时清空menu
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      let currentMenu = [
        // 布局组件
        {
          path: '/',
          component: () => import('@/views/Main'),
          children: []
        }
      ]
      // 对menu遍历 设置到children里
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      // console.log('current,', currentMenu)
      router.addRoutes(currentMenu)
      // router.addRoutes(currentMenu);
    },
    // 选择菜单为当前菜单
    selectMenu(state, val) {
      // 判断当前菜单页是否为home页
      if (val.name === 'home') {
        state.currentMenu = null // 如果是home页，点击其他菜单后状态不改变
      } else {
        // 判断tab标签是否已经添加进数组了
        // 如果添加，不进行操作
        let result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.currentMenu = val // 如果不是home页，点击其他菜单后状态改变
          state.tabList.push(val) // 如果没有添加，则添加
        }
      }
    },
    getMenu(state) {
      if (Cookie.get('tagList')) {
        let tagList = JSON.parse(Cookie.get('tagList'))
        state.tabsList = tagList
      }
    },
    // 关闭标签
    closeTab(state, val) {
      // 获取点击的标签再数组中的索引
      let result = state.tabList.findIndex(item => item.name === val.name)
      // 通过索引删除它
      state.tabList.splice(result, 1)
    },
    // 折叠侧边栏
    collapseAside(state) {
      state.isCollapse = state.isCollapse ? false : true
    }
  },
  actions: {}
}
