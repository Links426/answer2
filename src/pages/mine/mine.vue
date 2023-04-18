<template>
	<view class="h-100vh pt-32rpx flex flex-col items-center bg-#F7F8FA">
		<MineCard
			mb-56rpx
			:name="'未知用户'"
			:class-name="'未知班级'"
			:avater-url="'https://p.ipic.vip/v0144p.jpeg'"
		/>
		<MineSetting :icon-name="'icon-shezhi'" :content="'设置'" mb-24rpx />
		<button @click="test">123</button>
		<button class="dialog-btn" open-type="getUserInfo" @click="test">
			获取用户信息
		</button>
	</view>
</template>
<script setup lang="ts">
import { getProfile, getUserCode } from '@/api/users/login'
import { get, post } from '@/api/request'
import MineCard from '@/pages/mine/components/mine-card.vue'
import MineSetting from '@/pages/mine/components/mine-setting.vue'

const test = async () => {
	// await getUserCode().then((res) => console.log(res))
	await getProfile().then((res) => {
		console.log(res)
	})
	// await get('/login', { code: '0e1dVS0w3Up0u03Z8Q3w3itu6I2dVS0M' })
	// console.log(uni.getStorageSync('USER-TOKEN'))
}
</script>

<style scoped>
.mine-button {
	font-size: 24rpx;
	padding: 12rpx 20rpx;
	border: 2rpx solid #c2c7f3;
	border-radius: 8rpx;
}
</style>
