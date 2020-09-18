<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="1" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="subItem in item.children"
          :key="subItem.path"
          @click="clickMenu(subItem)"
        >
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      // 几个菜单选项的数据
      asideMenu: [
        {
          path: '/',
          label: '首页',
          name: 'home',
          icon: 's-home'
        },
        {
          path: '/video',
          label: '视频管理',
          name: 'video',
          icon: 'video-play'
        },
        {
          path: '/user',
          label: '用户管理',
          name: 'user',
          icon: 'user-solid'
        },
        {
          label: '其他',
          icon: 'more',
          children: [
            {
              path: '/page1',
              label: '页面1',
              name: 'page1',
              icon: 'setting'
            },
            {
              path: '/page2',
              label: '页面2',
              name: 'page2',
              icon: 'setting'
            }
          ]
        }
      ]
    }
  },
  computed: {
    // 过滤出无子菜单的菜单
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    // 过滤出有子菜单的菜单
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  methods: {
    // 通过点击事件改变当前菜单的状态
    clickMenu(item) {
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
