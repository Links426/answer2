<template>
  <scroll-view overscroll="auto" class="bg-#F7F7F7 h-100vh">
    <div p-24px>
      <AInput
        :title="'课程名称'"
        :placeholder="'请输入课程名称'"
        v-model="addRoomParams.detail"
      />
      <NButton @my-click="addRoom" :content="'添加课程内容'"></NButton>
    </div>
  </scroll-view>
</template>
<script setup lang="ts">
import { post } from "@/api/request";
import { uuid } from "@/hooks/uuid";
import AInput from "../course/components/addCourse-input.vue";
import { userStore } from "@/stores/userStore";
import NButton from "@/components/n-button.vue";

const useUserStore = userStore();
const { getAllCourseMsg } = useUserStore;
const { currentRoomMessage, currentCourseMessage, userInfo } =
  storeToRefs(useUserStore);

const addRoomParams = ref({
  teacherID: userInfo.value.userID,
  teacherName: userInfo.value.userName,
  academy: userInfo.value.academy,
  roomTitle: currentCourseMessage.value.courseName,
  detail: "",
});

const addRoom = () => {
  post("/admin/create/room", addRoomParams.value, {
    header: { "content-type": "application/json" },
  }).then((res) => {
    if (res.code === 200) {
      getAllCourseMsg()
      uni.showToast({
        title: "提交成功",
        icon: "success",
      });
      setTimeout(() => {
        uni.navigateBack({ delta: 1 });
      }, 1000);
    }
  });
};
</script>

<style scoped></style>
