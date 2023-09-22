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
      <view>{{ timeDiff(props.startTime, new Date().getTime()) }}前 </view>
    </view>
  </view>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: number;
  index: number;
  startTime: number;
  endTime: number;
}>();
const emit = defineEmits<{
  (e: "my-click", id: number): void;
}>();
// 定义一个函数，接受两个时间戳作为参数
function timeDiff(timestamp1: number, timestamp2: number) {
  // 计算两个时间戳之间的毫秒数差
  let diff = Math.abs(timestamp1 - timestamp2);
  // 计算出相差天数
  let days = Math.floor(diff / (24 * 3600 * 1000));
  // 如果超过一天，就返回xxx天
  if (days > 0) {
    return days + "天";
  }
  // 计算出小时数
  let hours = Math.floor(diff / (3600 * 1000));
  // 如果没超过一天，但超过一小时，就返回xxx小时
  if (hours > 0) {
    return hours + "小时";
  }
  // 计算出分钟数
  let minutes = Math.floor(diff / (60 * 1000));
  // 如果没超过一小时，但超过一分钟，就返回xxx分钟xxx秒
  if (minutes > 0) {
    // 计算出秒数
    let seconds = Math.floor((diff % (60 * 1000)) / 1000);
    return minutes + "分钟" + seconds + "秒";
  }
  // 如果没超过一分钟，就返回xxx秒
  let seconds = Math.floor(diff / 1000);
  return seconds + "秒";
}
console.log(timeDiff(props.startTime, new Date().getTime()));

onLoad(() => {});
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
