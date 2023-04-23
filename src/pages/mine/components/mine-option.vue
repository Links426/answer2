<template>
	<view class="mine-setting" @click="transferClick">
		<i class="iconfont" :class="iconName"> </i>
		{{ content }}
	</view>
</template>
<script setup lang="ts">
defineProps<{
	iconName: string
	content: string
}>()
const emits = defineEmits(['my-click'])
const transferClick = () => {
	emits('my-click')
}
</script>

<style scoped>
.mine-setting {
	width: 718rpx;
	height: 114rpx;
	color: #1d2128;
	background: #fff;
	display: flex;
	align-items: center;
	font-weight: bold;
	padding: 28rpx 36rpx;
	border-radius: 26rpx;
	box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(115, 110, 233, 0.06);
}
.iconfont {
	font-size: 52rpx;
	margin-right: 22rpx;
}
</style>
