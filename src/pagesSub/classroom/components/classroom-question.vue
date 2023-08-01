<template>
  <view class="classroom-question" @click="emit('my-click', id)">
    <view class="w-full h-150rpx bg-#6AA1FF rounded-t-8rpx p-28rpx text-white">
      <view flex justify-between>
        <view
          ><view mb-14rpx>Hello,你有新的习题</view>
          <view>第 {{ index + 1 }} 题</view></view
        >
        <i class="iconfont icon-rizhi"></i>
      </view>
    </view>

    <view class="h-full p-30rpx flex justify-between text-#1D2128 text-28rpx">
      <view>30秒前</view> <view>未完成</view></view
    >
  </view>
</template>
<script setup lang="ts">
defineProps<{ id: number; index: number }>();
const emit = defineEmits<{
  (e: "my-click", id: number): void;
}>();
</script>

<style scoped>
.classroom-question {
  width: 686rpx;
  height: 252rpx;
  border-radius: 8rpx;
  background-color: #fff;
  box-shadow: 0rpx 8rpx 12rpx 4rpx rgba(106, 161, 255, 0.11);
}
.icon-rizhi {
  font-size: 84rpx;
}
</style>
