<template>
	<view flex
		><view class="mine-button" @click="emit('myClick')">{{ content }}</view></view
	>
</template>
<script setup lang="ts">
defineProps<{ content: string }>()
const emit = defineEmits<{
	(e: 'myClick'): void
}>()
</script>

<style scoped>
.mine-button {
	font-size: 24rpx;
	padding: 12rpx 20rpx;
	border: 2rpx solid #c2c7f3;
	border-radius: 8rpx;
}
</style>
