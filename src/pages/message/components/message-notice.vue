<template>
	<view class="message-notice">
		<view flex justify-between items-center mb-24rpx
			><view class="text-#1D2128 text-36rpx"
				><span font-bold>{{ teacher }}&nbsp</span>{{ title }}</view
			>
			<view>{{ time }}</view></view
		>
		<view>{{ content }}</view>
	</view>
</template>
<script setup lang="ts">
withDefaults(
	defineProps<{
		id?: number
		title: string
		time: string | Date
		teacher: string | number
		content: string | number
	}>(),
	{
		title: '发布了未知消息',
		time: '未知时间',
		teacher: '未知老师',
		content: '未知内容',
	}
)
</script>

<style scoped>
.message-notice {
	width: 100%;
	color: #86909c;
	font-size: 28rpx;
	padding: 40rpx 28rpx 40rpx 50rpx;
	background-color: #fff;
	border-bottom: 1px solid #e7e9ed;
}
</style>
