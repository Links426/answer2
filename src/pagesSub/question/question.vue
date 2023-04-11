<template>
	<view class="p-32rpx text-#1D2128">
		<view
			class="w-full h-120rpx mb-20rpx text-white bg-#6AA1FF rounded-4rpx flex items-center justify-center"
		>
			未完成</view
		>
		<view class="p-26rpx bg-#E5E6EB mb-64rpx rounded-8rpx text-32rpx">{{
			questionOptionsList.title
		}}</view>

		<view
			flex
			mb-72rpx
			v-for="option in questionOptionsList.options"
			:key="option.index"
			@click="selectOption(option.index)"
		>
			<view
				class="question-option-bg"
				:class="option.index === questionSelectIndex ? 'question-option-bg-selected' : ''"
				>{{ String.fromCharCode(64 + parseInt((option.index + 1).toString())) }}</view
			>
			<view w-532rpx ml-40rpx text-32rpx> {{ option.value }}</view>
		</view>

		<view
			class="w-686rpx h-80rpx mb-100rpx rounded-8rpx flex items-center justify-center bg-#6AA1FF text-white"
			@click="submitAnswer"
			>提交</view
		>
	</view>
</template>
<script setup lang="ts">
const questionSelectIndex = ref(0)
const questionOptionsList = ref({
	id: 123,
	title: '请你说出Vue中的Diff算法是什么样子的?',
	options: [
		{
			index: 0,
			value:
				'diff 算法是一种通过同层的树节点进行比较的高效算法，避免了对树进行逐层搜索遍历，所以时间复杂度只有 O(n)。',
		},
		{
			index: 1,
			value:
				'vue 的虚拟 dom 渲染真实 dom 的过程中首先会对新老 VNode 的开始和结束位置进行标记:oldStartIdx、oldEndIdx、newStartIdx、newEndIdx。',
		},
		{
			index: 2,
			value:
				'标记好节点位置之后，就开始进入到的 while 循环处理中，这里是 diff 算法的核心流程，分情况进行了新老节点的比较并移动对应的 VNode 节点。while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。',
		},
		{
			index: 3,
			value:
				'当老 VNode 节点的 start 和新 VNode 节点的 end 满足 sameVnode 时，这说明这次数据更新后 oldStartVnode 已经跑到了 oldEndVnode 后面去了。',
		},
	],
})
const selectOption = (index: number) => {
	questionSelectIndex.value = index
}
const submitAnswer = () => {
	uni.showToast({
		title: '提交成功',
		icon: 'success',
	})
	setTimeout(() => {
		uni.navigateBack({ delta: 1 })
	}, 1000)
}
</script>

<style scoped>
.question-option-bg {
	width: 100rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 4rpx;
	color: #fff;
	background: #c9cdd4;
}
.question-option-bg-selected {
	background: linear-gradient(229deg, #aac7e9 0%, #405fff 100%);
}
</style>
