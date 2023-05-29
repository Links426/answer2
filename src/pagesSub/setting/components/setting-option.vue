<template>
	<view class="settion-option" @click="toDetail">
		<div>{{ title }}</div>
		<div flex items-center>
			<slot name="content"></slot>
			<input
				type="text"
				:placeholder="placeholder"
				text-right
				v-if="valueType === 'input'"
				v-model="inputModelValue"
				@input="transferInputValue"
				:disabled="disable"
			/>
			<view class="text-#7F7F7F" v-if="valueType === 'value'">{{ value }}</view>
			<i class="iconfont icon-qianwang ml-10rpx" v-if="showArrow"></i>
		</div>
	</view>
</template>
<script setup lang="ts">
import { to } from '@/hooks/toUrl'
type valueType = 'input' | 'select' | 'value' | 'slot'

const props = withDefaults(
	defineProps<{
		title: string
		showArrow?: boolean
		value?: string | number
		url?: string
		valueType?: valueType
		placeholder?: string
		modelValue?: string | number
		disable?: boolean
	}>(),
	{
		title: '未填写',
		showArrow: false,
		valueType: 'value',
		placeholder: '未填写',
		disable: true,
	}
)
const inputModelValue = ref(props.modelValue)

const emits = defineEmits(['update:modelValue'])

const transferInputValue = () => {
	emits('update:modelValue', inputModelValue)
}

const toDetail = () => {
	if (props.showArrow) {
		to(props.url!)
	}
}
</script>

<style scoped>
.settion-option {
	width: 100%;
	min-height: 82rpx;
	font-size: 28rpx;
	font-weight: 500;
	color: #1d2128;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 48rpx;
	border-top: 2rpx solid rgba(195, 195, 195, 0.17);
}
.icon-qianwang {
	font-size: 42rpx;
	font-weight: 700;
	color: #c6c6c6;
}
</style>
