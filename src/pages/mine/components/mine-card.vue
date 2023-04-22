<template>
	<view class="mine-idCard">
		<view flex flex-col justify-between font-bold h-full>
			<view flex
				><view>{{ name }}</view>
				<view class="ml-20rpx text-#C2C7F3">{{ className }}</view></view
			>
			<MineButton :content="'登陆'" @my-click="userLogin" v-if="!isLogin"></MineButton>
		</view>
		<view h-full>
			<view
				class="mine-avater"
				:style="{ backgroundImage: 'url(' + avaterUrl + ')' }"
			></view>
		</view>
	</view>
</template>
<script setup lang="ts">
import { getUserInfo } from '@/api/users/login'
import { getUserCode, getUserToken } from '@/api/users/login'

import MineButton from '@/pages/mine/components/mine-button.vue'
import { userStore } from '@/stores/userStore'

const useUserStore = userStore()
const { isLogin, userInfo } = storeToRefs(useUserStore)

withDefaults(
	defineProps<{
		name: string
		className: string
		avaterUrl: string
	}>(),
	{
		name: '未知用户',
		className: '未知班级',
		avaterUrl: 'https://p.ipic.vip/v0144p.jpeg',
	}
)

const userLogin = async () => {
	await getUserInfo()
	const code = (await getUserCode()) as string
	if (code) {
		await getUserToken(code)
		uni.setStorageSync('USER_INFO', userInfo.value)
	}
}
</script>

<style scoped>
.mine-avater {
	width: 128rpx;
	height: 128rpx;
	border-radius: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
}
.mine-idCard {
	width: 718rpx;
	height: 238rpx;
	padding: 36rpx;
	border-radius: 8rpx;
	color: #fff;
	display: flex;

	justify-content: space-between;
	background: linear-gradient(134deg, #5b77da 0%, #7c6aef 100%);
	box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(115, 110, 233, 0.06);
}
</style>
