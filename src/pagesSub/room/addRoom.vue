<template>
  <scroll-view overscroll="auto" class="bg-#F7F7F7 h-100vh">
    <div p-24px>
      <AInput
        :title="'课程名称'"
        :placeholder="'请输入课程名称'"
        v-model="addRoomParams.detail"
      />

      <picker
        mode="time"
        @change="(e:any) => handleSelectTime(e, 'startTime')"
        :start="'08:45'"
        :end="'22:00'"
      >
        <view w-full h-40px bg-white rounded-10px mt-12px
          >选择课程开始时间：{{ timestampToFormat(addRoomParams.startTime) }}
        </view>
      </picker>
      <picker
        mode="time"
        @change="(e:any) => handleSelectTime(e, 'endTime')"
        :start="'08:45'"
        :end="'22:00'"
        mb-24px
      >
        <view w-full h-40px bg-white rounded-10px mt-12px
          >选择课程结束时间：{{ timestampToFormat(addRoomParams.endTime) }}
        </view>
      </picker>
      <NButton @my-click="addRoom" :content="'添加课程内容'"></NButton>
    </div>
  </scroll-view>
</template>
<script setup lang="ts">
import { post } from "@/api/request";

import AInput from "../course/components/addCourse-input.vue";
import { userStore } from "@/stores/userStore";
import NButton from "@/components/n-button.vue";

const useUserStore = userStore();
const { getAllCourseMsg } = useUserStore;
const { currentRoomMessage, currentCourseMessage, userInfo } =
  storeToRefs(useUserStore);

const addRoomParams = ref({
  teacherID: userInfo.value.userID,
  roomTitle: currentCourseMessage.value.courseName,
  detail: "",
  startTime: 0,
  endTime: 0,
});
// 定义一个函数，接受一个时间戳（毫秒）作为参数，返回一个字符串
function timestampToFormat(timestamp: number): string {
  // 创建一个Date对象，用时间戳初始化
  let date = new Date(timestamp);
  // 获取年、月、日、时、分、秒
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // 月份从0开始，所以要加1
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  // 使用String的padStart方法，给不足两位的数字补0
  let monthStr = String(month).padStart(2, "0");
  let dayStr = String(day).padStart(2, "0");
  let hourStr = String(hour).padStart(2, "0");
  let minuteStr = String(minute).padStart(2, "0");

  // 拼接字符串，用-和:分隔
  let format = `${year}-${monthStr}-${dayStr} ${hourStr}:${minuteStr}`;
  // 返回结果
  return format;
}
// 定义一个函数，用于根据 HH-MM 格式的时间，得出时间戳
function getTimeStamp(time: string) {
  // 创建一个 Date 对象，表示当前日期和时间
  const date = new Date();
  // 从参数中提取小时和分钟
  const [hour, minute] = time.split(":").map(Number);
  // 设置 Date 对象的小时和分钟
  date.setHours(hour, minute);
  // 返回 Date 对象的时间戳
  return date.getTime();
}

const handleSelectTime = (
  e: { target: { value: string } },
  object: string | number
) => {
  addRoomParams.value[object] = getTimeStamp(e.target.value);
  console.log(addRoomParams.value[object]);
};
const addRoom = () => {
  post("/admin/create/room", addRoomParams.value, {
    header: { "content-type": "application/json" },
  }).then((res) => {
    if (res.code === 200) {
      getAllCourseMsg();
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
