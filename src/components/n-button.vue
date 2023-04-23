<template>
	<view
		class="flex w-698rpx py-28rpx text-32rpx rounded-24rpx text-white font-bold items-center justify-center bg-#578DF7"
		@click="emits('my-click')"
	>
		{{ content }}
	</view>
</template>
<script setup lang="ts">
withDefaults(
	defineProps<{
		content: string
	}>(),
	{ content: '未填写' }
)
const emits = defineEmits(['my-click'])
</script>

<style scoped></style>
