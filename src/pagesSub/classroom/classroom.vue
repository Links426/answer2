<template>
  <view h-100vh flex flex-col>
    <NavSelect
      :default-option="ClassroomPage.ALL"
      :select-options="selectClassroomOptions"
      @my-click="toClassroomPage"
    />
    <div class="flex-1 p-32rpx bg-#F7F8FA">
      <!-- // todos 这里的ID后面还需要更换 -->
      <div
        v-for="(question, index) in (classQuestionList as any[])"
        :key="index"
        mb-16px
      >
        <ClassroomQuestion
          :id="index"
          :index="index"
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

      <button @click="to('/pagesSub/classroom/classroom-publish')">
        发布题目
      </button>
    </div>
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

import { get, post } from "@/api/request";

const useUserStore = userStore();
const { currentQuestionData, currentRoomMessage } = storeToRefs(useUserStore);
const selectClassroomId = ref(ClassroomPage.ALL);

const toClassroomPage = (id: number) => {
  selectClassroomId.value = id;
};

const questionId = ref<number>(0);
const classQuestionList = ref([]);
onLoad((options: any) => {
  questionId.value = options.id;

  uni.setNavigationBarTitle({
    title: options.name,
  });



  post(
    "/user/get/course/task",
    {
      roomID: currentRoomMessage.value.roomID,
      sendID: currentRoomMessage.value.teacherID,
      targetID: "",
      recordType: "TeaPubRecord",
    },
    {
      header: { "content-type": "application/json" },
    }
  ).then((res) => {
    // 获取一节课里的所有问题
    classQuestionList.value = res?.data?.data as any;
  });
});
const toQuestion = (data: any) => {
  to(`../../pagesSub/question/question`);

  currentQuestionData.value = data;

  console.log(data);
};
</script>

<style scoped></style>
