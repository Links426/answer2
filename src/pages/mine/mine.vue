<template>
	<view class="h-100vh pt-32rpx flex flex-col items-center bg-#F7F8FA">
		<MineCard
			mb-56rpx
			:name="userInfo?.nickName"
			:class-name="'未知班级'"
			:avater-url="userInfo?.avatarUrl"
		/>
		<MineSetting :icon-name="'icon-shezhi'" :content="'设置'" mb-24rpx />
	</view>
</template>
<script setup lang="ts">
import MineCard from '@/pages/mine/components/mine-card.vue'
import MineSetting from '@/pages/mine/components/mine-setting.vue'
import { userStore } from '@/stores/userStore'

const useUserStore = userStore()
const { userInfo, isLogin } = storeToRefs(useUserStore)

onLoad(() => {
	const info = uni.getStorageSync('USER_INFO')
	if (info && isLogin) {
		userInfo.value = info
		isLogin.value = true
	}
})
</script>

<style scoped>
.mine-button {
	font-size: 24rpx;
	padding: 12rpx 20rpx;
	border: 2rpx solid #c2c7f3;
	border-radius: 8rpx;
}
</style>
