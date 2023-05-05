<template>
	<view mb-60rpx
		><view mb-36rpx text-28rpx font-bold>{{ date }} {{ day }}</view>
		<view flex>
			<img src="@/static/imgs/course/course-route.png" w-30rpx h-172rpx mr-46rpx />
			<view text-28rpx w-full>
				<view flex items-center mb-40rpx>
					<view mr-28rpx>{{ time }}</view>
					<view class="course-sign">课堂</view>
				</view>
				<view
					@click="toClassRoom(id)"
					class="px-26rpx py-22rpx bg-#F2F3F5 rounded-8rpx flex justify-between items-center"
				>
					<view>{{ name }}</view
					><i class="iconfont icon-qianwang"></i>
				</view>
			</view> </view
	></view>
</template>
<script setup lang="ts">
import { to } from '@/hooks/toUrl'
const props = withDefaults(
	defineProps<{
		id: string | number
		time: number | string
		name: string | number
	}>(),
	{
		time: Date.now(),
		name: '未设置名称',
	}
)
const date = computed(() => {
	return (
		new Date(props.time).getMonth() + 1 + '月' + new Date(props.time).getDate() + '日'
	)
})
const day = computed(() => {
	var sCN = '〇一二三四五六七'
	return '星期' + sCN.charAt(new Date(props.time).getDay())
})
// 不足两位 自动补 0 ，es7新函数
const time = computed(() => {
	return (
		new Date(props.time).getHours().toString().padStart(2, '0') +
		':' +
		new Date(props.time).getMinutes().toString().padStart(2, '0')
	)
})

const toClassRoom = (id: string | number) => {
	to(`/pagesSub/classroom/classroom?id=${id}&name=${props.name}`)
}
</script>

<style scoped>
.course-sign {
	color: #00b42a;
	padding: 3rpx 16rpx;
	border-radius: 4rpx;
	border: 2rpx solid #00b42a;
}
</style>
