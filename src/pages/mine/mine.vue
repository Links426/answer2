<template>
	<view class="h-100vh pt-32rpx flex flex-col items-center bg-#F7F8FA"
		><MineCard
			mb-56rpx
			:name="'links'"
			:class-name="'工商213'"
			:avater-url="'https://p.ipic.vip/v0144p.jpeg'"
		/>
		<MineSetting :icon-name="'icon-shezhi'" :content="'设置'" />
	</view>
</template>
<script setup lang="ts">
import MineCard from '@/pages/mine/components/mine-card.vue'
import MineSetting from '@/pages/mine/components/mine-setting.vue'
</script>

<style scoped>
.mine-button {
	font-size: 24rpx;
	padding: 12rpx 20rpx;
	border: 2rpx solid #c2c7f3;
	border-radius: 8rpx;
}
</style>
