<template>
	<view class="mb-36rpx text-40rpx font-bold text-#333">{{ title }}</view>
	<input
		type="text"
		:placeholder="placeholder"
		pb-24rpx
		class="input-border"
		@input="updateText"
		v-model="text"
	/>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		title: string
		placeholder: string
		modelValue: string
	}>(),
	{
		title: '标题',
		placeholder: '请输入标题',
	}
)

const text = ref(props.modelValue)

const emits = defineEmits(['update:modelValue'])

const updateText = (e: any) => {
	emits('update:modelValue', text.value)
}
</script>

<style scoped>
.input-border {
	border-bottom: 2rpx solid #ebebeb;
}
</style>
