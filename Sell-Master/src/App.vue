<template>
	<div id="app">
		<!-- 头部 -->
		<v-header :seller="seller"></v-header>
		<!-- 路由头部 -->
		<div class="tab">
			<div class="tab-item"><router-link to="/goods">商品</router-link></div>
			<div class="tab-item"><router-link to="/ratings">评论</router-link></div>
			<div class="tab-item"><router-link to="/seller">商家</router-link></div>
		</div>
		<!-- 路由页面 -->
		<!-- keep-alive有效缓存商品页面 -->
		<router-view :seller="seller"/>
	</div>
</template>

<script type="text/ecmascript-6">
'use strict'
import header from '@/components/header/header'
export default {
	data() {
		return {
			seller: {}
		}
	},
	created() {
		this.$http.get('/api/seller').then((response) => {
			response = response.body
			if (response.code === 0) {
				this.seller = response.data
			}
		})
	},
	components: {
		'v-header': header
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tab
	display:flex
	width:100%
	line-height: 40px
	text-align: center
	.tab-item
		flex: 1
		font-size: 14px
		color: rgb(77,85,93)
		.router-link-active
			color: rgb(240,20,20)
</style>
