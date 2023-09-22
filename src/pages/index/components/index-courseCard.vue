<template>
  <view class="course-card" @click="emit('toDetail')">
    <view flex justify-between items-center
      ><view text-32rpx font-bold>{{ title }}</view
      ><i class="iconfont icon-gengduo"></i
    ></view>
    <view flex justify-between items-center>
      <div flex>
        <div text-24rpx mr-8rpx v-for="item in teachClass" :key="item">「{{ item }}」</div>
      </div>
      <view flex items-center>
        <view text-24rpx font-bold mr-14rpx>
          {{ teacherName }}
        </view>
        <view
          class="course-card-avater"
          :style="{
            backgroundImage: 'url(' + teacherAvater + ')',
          }"
        ></view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    teachClass: Array<string> | string;
    teacherName: string;
    teacherAvater: string;
  }>(),
  {
    title: "未知课程",
    teachClass: "未知班级",
    teacherName: "未知老师",
    teacherAvater: "https://p.ipic.vip/v0144p.jpeg",
  }
);
const emit = defineEmits<{ (e: "toDetail"): void }>();
</script>

<style scoped>
.course-card {
  width: 694rpx;
  height: 252rpx;
  border-radius: 8rpx;
  padding: 26rpx;
  margin-bottom: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  background-image: url("https://p.ipic.vip/n33pu7.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.course-card-avater {
  width: 44rpx;
  height: 44rpx;
  border-radius: 100%;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.icon-gengduo {
  font-size: 40rpx;
}
</style>
