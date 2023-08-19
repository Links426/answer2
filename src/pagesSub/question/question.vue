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
      v-for="(option, index) in questionOptionsList?.options"
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
import { post } from "@/api/request";
import { userStore } from "@/stores/userStore";

const useUserStore = userStore();
const { currentQuestionData, currentRoomMessage, userInfo } =
  storeToRefs(useUserStore);

onLoad(() => {
  questionOptionsList.value = toRaw(currentQuestionData.value).courseRecord;
});
const questionOptionsList = ref<any>({});
const questionSelectIndex = ref(0);
// 是否填写
const hasSubmit = ref(false);
const selectOption = (index: number) => {
  questionSelectIndex.value = index;
  console.log(studentAnswer.value);
};

const studentAnswer = ref({
  id: toRaw(currentQuestionData?.value.courseRecord?.id),
  getScore:
    toRaw(
      currentQuestionData?.value?.courseRecord?.options[
        questionSelectIndex?.value
      ]
    ) === currentQuestionData.value.courseRecord.answer,
  hasSubmit: hasSubmit.value,
  submitTime: 0,
  answers: [
    toRaw(
      currentQuestionData?.value?.courseRecord?.options[
        questionSelectIndex?.value
      ]
    ),
  ],
});

const submitAnswer = () => {
  console.log(toRaw(studentAnswer.value));
  studentAnswer.value.hasSubmit = hasSubmit.value;
  studentAnswer.value.submitTime = new Date().getTime();
  post(
    "/ws/post/msg",
    {
      roomID: "1059437675",
      senderID: [userInfo.value.userID],
      // receiverID: [currentQuestionData.value.SenderID],
      receiverID: ["12100000002"],

      msgType: "courseRecord",
      chatMsg: "",
      judgeDelete: 0,
      courseRecord: toRaw(studentAnswer.value),
    },
    {
      header: { "content-type": "application/json" },
    }
  ).then((res) => {
    console.log({
      roomID: "1059437675",
      senderID: [userInfo.value.userID],
      // receiverID: [currentQuestionData.value.SenderID],
      receiverID: ["12100000002"],

      msgType: "StuPubRecord",
      chatMsg: "",
      judgeDelete: 0,
      courseRecord: toRaw(studentAnswer.value),
    });
    hasSubmit.value = true;
    // console.log(res.resultData);
    // uni.showToast({
    //   title: "提交成功",
    //   icon: "success",
    // });
    // setTimeout(() => {
    //   hasSubmit.value = true;
    //   uni.navigateBack({ delta: 1 });
    // }, 1000);
  });
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
