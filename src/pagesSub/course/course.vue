<template>
  <view h-100vh flex flex-col>
    <div flex justify-between class="course-title">
      <view>{{ courseList[props?.index]?.courseName }}</view>
      <div><button @click="deleteCourse">删除</button></div>
    </div>
    <view flex-1>
      <view pl-44rpx font-bold text-40rpx mb-20rpx mt-30rpx>学习日志</view>
      <button
        @click="to('/pagesSub/room/addRoom')"
        v-if="userInfo.role === '教师'"
      >
        添加room
      </button>
      <NavSelect
        :select-options="courseSelectOptions"
        :default-option="coursePageSelected"
        @my-click="changePageSelect"
      />
      <div h-full>
        <scroll-view
          :scroll-y="true"
          :scroll-with-animation="true"
          :refresher-enabled="true"
          :refresher-triggered="courseFreshTrigger"
          @refresherrefresh="handleCourseFreshList"
          px-48rpx
          pt-40rpx
          h-full
        >
          <view v-show="coursePageSelected === coursePage.CourseRoute">
            <CourseRoute
              v-for="route in courseList[props?.index]?.room"
              :key="route.roomID"
              :id="route.roomID"
              :startTime="route.startTime"
              :endTime="route.endTime"
              :name="route.detail"
            />
          </view>

          <img
            src="@/static/imgs/course/empty.svg"
            v-show="coursePageSelected !== coursePage.CourseRoute"
          />
        </scroll-view>
      </div> </view
  ></view>
</template>
<script setup lang="ts">
import { get, post, Delete } from "@/api/request";
import NavSelect from "@/components/nav-select.vue";
import { to } from "@/hooks/toUrl";
import CourseRoute from "@/pagesSub/course/components/course-route.vue";
import { userStore } from "@/stores/userStore";
import { coursePage, courseSelectOptions } from "@/utils/course/course";

const useUserStore = userStore();
const { userInfo, courseList, currentCourseMessage } =
  storeToRefs(useUserStore);
const { getAllCourseMsg } = useUserStore;
const coursePageSelected = ref(coursePage.CourseRoute);
const props = ref();
const courseFreshTrigger = ref(false);
const handleCourseFreshList = async () => {
  courseFreshTrigger.value = true;
  await getAllCourseMsg().then(() => {
    courseFreshTrigger.value = false;
  });
};

const changePageSelect = (id: number) => {
  coursePageSelected.value = id;
};

const deleteCourse = () => {
  console.log(currentCourseMessage.value.courseID);

  uni.showModal({
    title: "提示",
    content: "确认删除该条信息吗？",
    success: function (res) {
      if (res.confirm) {
        Delete(
          `/admin/del/course?courseID=${currentCourseMessage.value.courseID}`
        ).then((res) => {
          if (res.code === 200) {
            getAllCourseMsg();
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

onLoad((options: any) => {
  props.value = options;

  currentCourseMessage.value = toRaw(courseList.value).find((item) => {
    return item.courseID === options.courseID;
  });

  uni.setNavigationBarTitle({
    title: props.value.title,
  });
});
</script>

<style scoped>
.course-title {
  font-weight: bold;
  font-size: 40rpx;
  padding: 40rpx 28rpx;
  border: 1px solid #e4e6eb;
}
</style>
