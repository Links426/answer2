<template>
  <view h-100vh flex flex-col>
    <NavSelect
      :default-option="ClassroomPage.ALL"
      :select-options="selectClassroomOptions"
      @my-click="toClassroomPage"
    />
    <view class="flex-1 p-32rpx bg-#F7F8FA">
      <!-- // todos 这里的ID后面还需要更换 -->

      <div
        v-for="(question, index) in (classQuestionList as any[])"
        :key="index"
        mb-16px
      >
        <ClassroomQuestion
          :id="index"
          :index="index"
          :startTime="question.courseRecord.startTime"
          :endTime="question.courseRecord.endTime"
          @my-click="toQuestion(question)"
          v-show="
            selectClassroomId === ClassroomPage.ALL ||
            selectClassroomId === ClassroomPage.QUESTIONS
          "
        />
      </div>
      <img
        v-show="selectClassroomId === ClassroomPage.EXAM"
        src="@/static/imgs/course/empty.svg"
      />

      <button
        @click="to('/pagesSub/classroom/classroom-publish')"
        v-if="userInfo.role === '教师'"
      >
        发布题目
      </button>
      <button @click="deleteRoom" v-if="userInfo.role === '教师'">
        删除课程
      </button>
    </view>
  </view>
</template>
<script setup lang="ts">
import NavSelect from "@/components/nav-select.vue";
import ClassroomQuestion from "@/pagesSub/classroom/components/classroom-question.vue";
import {
  ClassroomPage,
  selectClassroomOptions,
} from "@/utils/classroom/classroom";
import { to } from "@/hooks/toUrl";
import { userStore } from "@/stores/userStore";

import { Delete, get, post } from "@/api/request";
import { connectWs } from "@/api/websocket";

const useUserStore = userStore();
const {
  currentQuestionData,
  currentRoomMessage,
  userInfo,
  currentCourseMessage,
  transportRoomID,
  classQuestionList,
} = storeToRefs(useUserStore);

const { getAllQuestion } = useUserStore;
const selectClassroomId = ref(ClassroomPage.ALL);

const toClassroomPage = (id: number) => {
  selectClassroomId.value = id;
};

const questionId = ref<number>(0);

onLoad((options: any) => {
  questionId.value = options.id;

  uni.setNavigationBarTitle({
    title: options.name,
  });

  currentRoomMessage.value.roomID = options.roomID;

  if (options.teacherID) {
    currentRoomMessage.value.teacherID = options.teacherID;
  }
  getAllQuestion(options.roomID, options.teacherID);
  connectWs(userInfo.value.userID, options.roomID).onMessage((res) => {
    console.log(res);
    getAllQuestion(options.roomID, options.teacherID);
  });
});

const deleteRoom = () => {
  uni.showModal({
    title: "提示",
    content: "确认删除该条信息吗？",
    success: function (res) {
      if (res.confirm) {
        Delete(
          `/admin/del/room?roomID=${currentRoomMessage.value.roomID}`
        ).then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });
            setTimeout(() => {
              uni.navigateBack({ delta: 1 });
            }, 1000);
          }
        });
      } else {
        return;
      }
    },
  });
};

const toQuestion = (data: any) => {
  to(`../../pagesSub/question/question`);

  currentQuestionData.value = data;
};
</script>

<style scoped></style>
