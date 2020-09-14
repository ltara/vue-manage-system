<template>
	<header>
		<div class="l-content">
			<el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="current.path" v-if="current">
					{{ current.label }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="r-content">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					<img class="user-img" :src="userImg" alt="" />
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			userImg: require('@/assets/image/user.jpg')
		}
	},
	// 获取当前菜单状态
	computed: {
		...mapState({
			current: (state) => state.tab.currentMenu
		})
	}
}
</script>

<style lang="scss" scoped>
header {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: space-between;
}
.l-content {
	display: flex;
	align-items: center;
	.el-button {
		margin-right: 20px;
	}
}
.r-content {
	.user-img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		cursor: pointer;
	}
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
	color: #fff;
}
.el-breadcrumb__item {
	color: #f4f4f4;
	&:last-child .el-breadcrumb__inner {
		color: #fff;
	}
}
</style>
