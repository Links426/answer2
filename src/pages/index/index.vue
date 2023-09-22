<template>
  <view w-full h-100vh flex flex-col>
    <div
      w-full
      h-30px
      v-if="inClassRoom"
      @click="
        to(
          `/pagesSub/classroom/classroom?roomID=${inClassRoom?.roomID}&name=${
            inClassRoom?.detail || '未设置名称'
          }&teacherID=${inClassRoom?.teacherID}`
        )
      "
    >
      {{ inClassRoom ? "您当前有正在上的课，点击跳转 -> " : "" }}
    </div>

    <view class="carousel"></view>
    <NavSelect
      :select-options="indexSelectList"
      :defaultOption="1"
      @my-click="selectIndexNav"
    />
    <scroll-view
      :scroll-y="true"
      :scroll-with-animation="true"
      :refresher-enabled="true"
      :refresher-triggered="IndexRefreshTrigger"
      @refresherrefresh="handleRefreshIndexList"
      class="scroll-content"
    >
      <view w-full pt-32rpx flex flex-col items-center>
        <div>
          <IndexCourseCard
            :teacherName="course?.teaName"
            :teachClass="course?.class"
            :title="course?.courseName"
            :teacher-avater="course?.avatarURL"
            v-for="(course, index) in courseList"
            :key="index"
            @to-detail="
              to(
                `/pagesSub/course/course?index=${index}&title=${course.courseName}&courseID=${course.courseID}`
              )
            "
          />
          <NButton
            :content="'没有课程？立即添加'"
            @my-click="addClass"
            v-if="userInfo.role === '教师'"
          ></NButton>
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
import { Delete, get } from "@/api/request";
import { connectWs } from "@/api/websocket";
const useUserStore = userStore();
const { userInfo, courseList } = storeToRefs(useUserStore);
const { getAllCourseMsg, getAllQuestion } = useUserStore;
const IndexRefreshTrigger = ref(false);

const handleRefreshIndexList = async () => {
  IndexRefreshTrigger.value = true;
  await getAllCourseMsg().then((res) => {
    IndexRefreshTrigger.value = false;
  });
};

const addClass = async () => {
  to("/pagesSub/course/addCourse");
};

const test = () => {
  console.log(1);
  uni.login({
    success: (res) => {
      console.log(res);
    },
  });
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
  connectWs(111, 807077604).onMessage((res) => {
    console.log(res.data);
  });
};
const deleteWs = () => {
  Delete("/ws/delete/conn?roomID=482589151&ID=111");
};

const inClassRoom = ref();

onLoad(async () => {
  const info = uni.getStorageSync("USER_INFO");

  if (info) {
    userInfo.value = info;
  }
  await getAllCourseMsg();
  // 获取当前时间戳
  const currentTimeStamp = Date.now();
  // 获取原始数组
  let list = toRaw(courseList.value);
  // 遍历数组中的每个课程对象
  list?.forEach((course) => {
    // 如果课程对象有room属性
    if (course.room) {
      // 遍历room数组中的每个房间对象
      course.room.forEach((room: { startTime: number; endTime: number }) => {
        // 如果房间对象有startTime属性，并且当前时间在开始时间和结束时间之间
        if (
          room.startTime &&
          room.startTime <= currentTimeStamp &&
          room.endTime >= currentTimeStamp
        ) {
          inClassRoom.value = room;
        }
      });
    }
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
