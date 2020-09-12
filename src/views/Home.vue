<template>
	<el-container style="height: 100%">
		<el-aside width="200px">
			<comp-aside></comp-aside>
		</el-aside>
		<el-container>
			<el-header>
				<comp-header></comp-header>
			</el-header>
			<el-main>Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
import CompHeader from "@/components/common/Header.vue"
import CompAside from "@/components/common/Aside.vue"
export default {
	components: {
		CompHeader,
		CompAside
	}
}
</script>

<style lang="scss" scoped>
.el-header {
	background-color: #333;
}
</style>
