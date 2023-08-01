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
      v-for="(option, index) in questionOptionsList?.Options"
      :key="option.index"
      @click="selectOption(index)"
    >
      <view
        class="question-option-bg"
        :class="
          index == questionSelectIndex ? 'question-option-bg-selected' : ''
        "
        >{{ option.key }}</view
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
import { userStore } from "@/stores/userStore";

const useUserStore = userStore();
const { currentQuestionData } = storeToRefs(useUserStore);

onLoad(() => {
  questionOptionsList.value = toRaw(currentQuestionData.value);
});
const questionOptionsList = ref<any>({});
const questionSelectIndex = ref(0);
const selectOption = (index: number) => {
  questionSelectIndex.value = index;
};
const submitAnswer = () => {
  uni.showToast({
    title: "提交成功",
    icon: "success",
  });
  setTimeout(() => {
    uni.navigateBack({ delta: 1 });
  }, 1000);
};
</script>

<style scoped>
.question-option-bg {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  font-size: 16px;
  justify-content: center;
  border-radius: 4rpx;
  color: #fff;
  background: #c9cdd4;
}
.question-option-bg-selected {
  background: linear-gradient(229deg, #aac7e9 0%, #405fff 100%);
}
</style>
