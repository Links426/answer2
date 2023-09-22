<template>
  <view class="p-32rpx text-#1D2128">
    <div v-if="userInfo.role === '学生'">
      <view
        class="w-full h-120rpx mb-20rpx text-white bg-#6AA1FF rounded-4rpx flex items-center justify-center"
        :class="studentOwnAnswer?.hasSubmit ? ' bg-#6AA1FF' : 'bg-#8999AF'"
      >
        {{ studentOwnAnswer?.hasSubmit ? "已完成" : "未完成" }}
      </view>

      <view class="p-26rpx bg-#E5E6EB mb-64rpx rounded-8rpx text-32rpx">{{
        questionOptionsList.title
      }}</view>
      <!-- 填空题的图片 -->
      <img
        v-if="questionOptionsList?.options?.photo"
        :src="questionOptionsList?.options?.photo[0]?.value"
      />
      <view
        flex
        mb-72rpx
        v-for="(option, index) in questionOptionsList?.options?.chose"
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
      <div class="p-26rpx bg-#E5E6EB mb-64rpx rounded-8rpx text-32rpx">
        你提交的答案为：
        {{
          studentOwnAnswer?.answers?.chose
            ? studentOwnAnswer.answers.chose[0].key
            : ""
        }}
      </div>
        <img w-200px h-200px bg-contain
          :src="
            studentOwnAnswer?.answers?.photo
              ? studentOwnAnswer.answers.photo[0].value
              : ''
          "
        />
      <div
        w-full
        mt-12px
        h-255px
        rounded-8px
        v-if="
          userInfo.role === '学生' &&
          !studentOwnAnswer?.hasSubmit &&
          questionOptionsList?.options?.photo
        "
      >
        <div mb-12px>上传图片(可选)</div>
        <button
          class="mb-60rpx avatarButton"
          :style="{
            backgroundImage:
              'url(' + studentCommentAnswer.answers.photo[0].value + ')',
          }"
          @click="onChooseImg"
        >
          <i class="iconfont icon-paizhao"></i>
        </button>
      </div>
      <view
        class="w-686rpx h-80rpx mb-100rpx rounded-8rpx flex items-center justify-center bg-#6AA1FF text-white"
        @click="submitAnswer"
        v-if="userInfo.role === '学生' && !studentOwnAnswer?.hasSubmit"
        >提交</view
      >
    </div>
    <div v-if="userInfo.role === '教师'">
      <view
        class="w-full h-120rpx mb-20rpx text-white bg-#6AA1FF rounded-4rpx flex items-center justify-center"
      >
        学生回答情况：</view
      >
      <view class="p-26rpx bg-#E5E6EB mb-32rpx rounded-8rpx text-32rpx"
        >问题：{{ questionOptionsList.title }}</view
      >
      <!-- 填空题的图片 -->
      <img
        v-if="questionOptionsList?.options?.photo"
        :src="questionOptionsList?.options?.photo[0]?.value"
      />
      <view
        flex
        mb-32rpx
        v-for="(option, index) in questionOptionsList?.options?.chose"
        :key="option.index"
      >
        <view class="question-option-bg">{{ option.key }}</view>
        <view w-532rpx ml-40rpx text-32rpx> {{ option.value }}</view>
      </view>
      <!-- 选择题提交情况 -->
      <div v-if="questionOptionsList?.options?.chose">
        <div>提交：</div>
        <div
          class="question-option-bg"
          v-for="res in currentQuestionStudentResult"
          :key="res"
          :class="
            res?.courseRecord?.getScore ? 'question-option-bg-selected' : ''
          "
        >
          {{ res?.courseRecord?.getScore }} {{ res.StuInfos.userName }}
        </div>
      </div>
      <div v-if="questionOptionsList?.options?.photo">
        <div>正确：</div>

        <div
          class="question-option-bg question-option-bg-selected"
          v-for="res in currentQuestionStudentResult"
          :key="res"
        >
          <div>{{ res.StuInfos.userName }}:</div>
          <img
            :src="res?.courseRecord?.answers?.photo[0].value"
            w-full
            h-full
          />
        </div>
      </div>
    </div>
  </view>
</template>
<script setup lang="ts">
import { get, post } from "@/api/request";
import { userStore } from "@/stores/userStore";

const useUserStore = userStore();
const { currentQuestionData, currentRoomMessage, userInfo } =
  storeToRefs(useUserStore);

onLoad(async () => {
  questionOptionsList.value = toRaw(currentQuestionData.value)?.courseRecord;

  await getStudentAnswerList();
  await getStudentOwnAnswer();
});
const studentOwnAnswer = ref<any>({});
const getStudentOwnAnswer = async () => {
  await get("/admin/get/students/answers", {
    roomID: currentRoomMessage.value.roomID,
    teacherID: currentRoomMessage.value.teacherID,
    questionsID: questionOptionsList.value.id,
    //todo 这里记得换id
    studentID: userInfo.value.userID,
  }).then((res) => {
    console.log(res.data.data);
    if (res.data) {
      studentOwnAnswer.value = res.data.data[0].courseRecord;
    }
  });
};
const questionOptionsList = ref<any>({});
const questionSelectIndex = ref(0);
// 是否填写
const hasSubmit = ref(false);
const selectOption = (index: number) => {
  questionSelectIndex.value = index;
};
const currentQuestionStudentResult = ref<any[]>([]);
const getStudentAnswerList = async () => {
  const res = await get("/admin/get/students/answers", {
    roomID: currentRoomMessage.value.roomID,
    teacherID: currentRoomMessage.value.teacherID,
    questionsID: questionOptionsList.value.id,
  });
  currentQuestionStudentResult.value = res?.data?.data;
};
const handleCheckAnswer = () => {
  if (currentQuestionData.value?.courseRecord?.options?.chose) {
    return (
      currentQuestionData.value?.courseRecord?.options?.chose[
        questionSelectIndex.value
      ].key == currentQuestionData?.value?.courseRecord?.answer
    );
  }
};

const studentChoseAnswer = ref({
  id: currentQuestionData?.value?.courseRecord?.id,
  getScore: false,
  hasSubmit: true,
  submitTime: 0,
  answers: {
    chose: [{ key: "A", value: "1" }],
  },
});

const studentCommentAnswer = ref({
  id: currentQuestionData?.value?.courseRecord?.id,
  getScore: true,
  hasSubmit: true,
  submitTime: 0,
  answers: {
    photo: [{ key: "img", value: "" }],
  },
});

const submitSelectAnswer = () => {
  hasSubmit.value = true;
  studentChoseAnswer.value.hasSubmit = hasSubmit.value;
  studentChoseAnswer.value.submitTime = new Date().getTime();
  studentChoseAnswer.value.getScore = Boolean(handleCheckAnswer());
  let selResult = toRaw(currentQuestionData.value)?.courseRecord?.options
    ?.chose[questionSelectIndex?.value];
  studentChoseAnswer.value.answers.chose = [];
  studentChoseAnswer.value.answers.chose.push(selResult);
  post(
    "/ws/post/msg",
    {
      roomID: currentRoomMessage.value.roomID,
      senderID: [userInfo.value.userID],
      receiverID: [currentQuestionData.value.SenderID],

      msgType: "courseRecord",
      chatMsg: "",
      judgeDelete: 0,
      courseRecord: toRaw(studentChoseAnswer.value),
    },
    {
      header: { "content-type": "application/json" },
    }
  ).then((res) => {
    hasSubmit.value = true;

    uni.showToast({
      title: "提交成功",
      icon: "success",
    });
    setTimeout(() => {
      hasSubmit.value = true;
      uni.navigateBack({ delta: 1 });
    }, 1000);
  });
};

const submitCommentAnswer = () => {
  hasSubmit.value = true;
  post(
    "/ws/post/msg",
    {
      roomID: currentRoomMessage.value.roomID,
      senderID: [userInfo.value.userID],
      receiverID: [currentQuestionData.value.SenderID],

      msgType: "courseRecord",
      chatMsg: "",
      judgeDelete: 0,
      courseRecord: toRaw(studentCommentAnswer.value),
    },
    {
      header: { "content-type": "application/json" },
    }
  ).then((res) => {
    uni.showToast({
      title: "提交成功",
      icon: "success",
    });
    setTimeout(() => {
      hasSubmit.value = true;
      uni.navigateBack({ delta: 1 });
    }, 1000);
  });
};

const submitAnswer = () => {
  if (questionOptionsList.value.options.chose) {
    submitSelectAnswer();
  } else if (questionOptionsList.value.options?.photo) {
    submitCommentAnswer();
  }
};

const onChooseImg = (e: { detail: any }) => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    success: (res) => {
      uni.uploadFile({
        url: "http://193.112.177.42:32323/Upload",
        filePath: res.tempFilePaths[0],
        name: "image",
        header: { "Content-Type": "multipart/form-data" },
        success: (res: any) => {
          studentCommentAnswer.value.answers.photo[0].value = JSON.parse(
            res.data
          ).data.image_url;
        },
      });
    },
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
.avatarButton {
  width: 200rpx;
  height: 200rpx;
  border-radius: 15rpx;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #c9cdd4;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
