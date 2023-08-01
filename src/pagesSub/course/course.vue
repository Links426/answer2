<template>
  <view class="course-title">{{ courseList[props?.index]?.courseName }}</view>
  <view pt-32rpx>
    <view pl-44rpx font-bold text-40rpx mb-20rpx>学习日志</view>
    <NavSelect
      :select-options="courseSelectOptions"
      :default-option="coursePageSelected"
      @my-click="changePageSelect"
    />
    <view px-48rpx pt-40rpx>
      <view v-show="coursePageSelected === coursePage.CourseRoute">
        <CourseRoute
          v-for="route in courseList[props?.index]?.room"
          :key="route.roomID"
          :id="route.roomID"
          :time="route.create_at"
          :name="route.roomTitle"
        />
      </view>
      <img
        src="@/static/imgs/course/empty.svg"
        v-show="coursePageSelected !== coursePage.CourseRoute"
      />
    </view>
  </view>
</template>
<script setup lang="ts">
import { get } from "@/api/request";
import NavSelect from "@/components/nav-select.vue";
import CourseRoute from "@/pagesSub/course/components/course-route.vue";
import { userStore } from "@/stores/userStore";
import { coursePage, courseSelectOptions } from "@/utils/course/course";

const useUserStore = userStore();
const { userInfo, courseList } = storeToRefs(useUserStore);
const coursePageSelected = ref(coursePage.CourseRoute);
const props = ref();
const changePageSelect = (id: number) => {
  coursePageSelected.value = id;
};

onLoad((options: any) => {
  // courseDetail.value.id = options.id

  props.value = options;

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
