<template>
  <view w-full h-100vh flex flex-col>
    <view class="carousel"></view>
    <NavSelect
      :select-options="indexSelectList"
      :defaultOption="1"
      @my-click="selectIndexNav"
    />
    <scroll-view scroll-y="true" class="scroll-content">
      <view w-full pt-32rpx flex flex-col items-center>
        <div>
          <IndexCourseCard
            :teacherName="course?.teaName"
            :teachClass="course?.academy"
            :title="course?.courseName"
            :teacher-avater="course?.avatarURL"
            v-for="(course, index) in courseList"
            :key="index"
            @to-detail="
              to(
                `/pagesSub/course/course?index=${index}&title=${course.courseName}`
              )
            "
          />
          <NButton
            :content="'没有课程？立即添加'"
            @my-click="addClass"
          ></NButton>
          <NButton :content="'测试链接'" @my-click="testWs"></NButton>
          <NButton :content="'测试删除链接'" @my-click="deleteWs"></NButton>
        </div>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import NavSelect from "@/components/nav-select.vue";
import NButton from "@/components/n-button.vue";
import IndexCourseCard from "@/pages/index/components/index-courseCard.vue";

import { userStore } from "@/stores/userStore";
import { indexSelectList } from "@/utils/index/index";
import { to } from "@/hooks/toUrl";
import { Delete, get, post } from "@/api/request";
import { connectWs } from "@/api/websocket";

const useUserStore = userStore();
const { userInfo, courseList } = storeToRefs(useUserStore);
const addClass = async () => {
  to("/pagesSub/course/addCourse");
};

const selectIndexNav = async (id: Number) => {
  if (id === 1) {
    await get("/user/get/course", {
      params: {
        ID: userInfo.value.userID,
        Name: userInfo.value.userName,
        Role: userInfo.value.role === "学生" ? "student" : " teacher",
      },
    }).then((res) => {
      console.log(res);
    });
  }
};

const testWs = () => {
  connectWs(12100000001, 1059437675).onMessage((res) => {
    console.log(res.data);
  });
};
const deleteWs = () => {
  Delete("/ws/delete/conn?roomID=1059437675&ID=12100000001");
};
onLoad(() => {
  const info = uni.getStorageSync("USER_INFO");

  if (info) {
    userInfo.value = info;
  }

  get("/user/get/course", {
    ID: userInfo.value.userID,
    name: userInfo.value.userName,
    role: userInfo.value.role === "学生" ? "student" : " teacher",
  }).then(({ data }) => {
    courseList.value = data?.data?.course;
  });
});
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 320rpx;
  background-image: url("https://p.ipic.vip/v0144p.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.nav-select {
  display: flex;
  height: 104rpx;
  padding: 36rpx 0 0 28rpx;
  background: #fff;
  border-bottom: 1px solid #e7e9ed;
}
.nav-select-option {
  color: #1d2128;
  padding-bottom: 22rpx;
  font-weight: bold;
  height: 100%;
  border-bottom: 2px solid #4080ff;
}
.scroll-content {
  flex: 1;
  overflow: scroll;
  background-color: #f7f8fa;
}
</style>
