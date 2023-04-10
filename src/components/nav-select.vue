<template>
	<view class="nav-select">
		<view
			class="nav-select-option"
			v-for="option in selectOptions"
			:key="option.id"
			:class="optionSelectedId === option.id ? 'nav-select-option-selected' : ''"
			@click="optionSelect(option.id)"
			>{{ option.value }}</view
		>
	</view>
</template>
<script setup lang="ts">
interface option {
	id: number
	value: string | number
	url?: string
}
// 数组要用箭头函数进行返回
const props = withDefaults(
	defineProps<{
		selectOptions: option[]
		defaultOption?: number
	}>(),
	{
		selectOptions: () => [{ id: 0, value: '未知选项', url: '/' }],
		defaultOption: 0,
	}
)
const emit = defineEmits(['my-click'])
const optionSelectedId = ref(props.defaultOption)
const optionSelect = (id: number) => {
	optionSelectedId.value = id
	emit('my-click', optionSelectedId.value)
}
</script>

<style scoped>
.nav-select {
	display: flex;
	height: 104rpx;
	padding: 36rpx 0 0 28rpx;
	background: #fff;
	border-bottom: 1px solid #e7e9ed;
}
.nav-select-option {
	height: 100%;
	color: #c9cdd4;
	font-weight: bold;
	transition: all 0.3s;
	padding: 0 24rpx 22rpx;
}
.nav-select-option-selected {
	color: #1d2128;
	font-weight: bold;
	height: 100%;
	transition: all 0.3s;
	padding: 0 24rpx 22rpx;
	border-bottom: 1px solid #4080ff;
}
</style>
