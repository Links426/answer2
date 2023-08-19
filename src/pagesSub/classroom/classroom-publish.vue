<template>
  <scroll-view overscroll="auto" class="bg-#F7F7F7 h-100vh">
    <div p-24px>
      <AInput
        :title="'题目名称'"
        :placeholder="'请输入题目名称'"
        v-model="PublishQuestionObj.title"
      />
      <div w-full mt-12px bg-white h-255px rounded-8px>
        <div>题目选项</div>
        <div>
          <div
            v-for="input in PublishQuestionObj.options"
            :key="input.key"
            flex
          >
            <div>{{ input.key }}</div>
            <input type="text" v-model="input.value" placeholder="请输入答案" />
          </div>
        </div>
        <picker
          mode="selector"
          :range="range"
          :range-key="'key'"
          :value="selectTime"
          @change="handleSelectTime"
        >
          <view class="picker">
            选择问题持续时间: {{ range[selectTime].key }}
          </view>
        </picker>
        <button @click="classPublishQuestion">发布</button>
      </div>
    </div>
  </scroll-view>
</template>
<script setup lang="ts">
import { post } from "@/api/request";
import { uuid } from "@/hooks/uuid";
import AInput from "../course/components/addCourse-input.vue";
import { userStore } from "@/stores/userStore";

const useUserStore = userStore();
const { currentRoomMessage, userInfo } = storeToRefs(useUserStore);
const { getAllCourseMsg } = useUserStore;
const MinutTimeStamp = 60000;
const selectTime = ref(0);
const range = [
  {
    key: "1分钟",
    value: 1,
  },
  // "2分钟",，
  {
    key: "3分钟",
    value: 3,
  },
  {
    key: "5分钟",
    value: 5,
  },
  {
    key: "10分钟",
    value: 10,
  },
  {
    key: "45分钟",
    value: 45,
  },
  {
    key: "90分钟",
    value: 90,
  },
  {
    key: "无期限",
    value: Infinity,
  },
];
const PublishQuestionObj = ref({
  id: uuid(), // Ajs838198d1
  title: "asd",
  answer: "A",
  startTime: 0,
  endTime: 0, // 1691289108136
  options: [
    { key: "A", value: "123" },
    { key: "B", value: "123" },
    { key: "C", value: "123" },
    { key: "D", value: "213" },
  ],
});

const handleSelectTime = (e: { target: { value: number } }) => {
  selectTime.value = e.target.value;
};

const classPublishQuestion = () => {
  PublishQuestionObj.value.startTime = new Date().getTime();
  PublishQuestionObj.value.endTime =
    new Date().getTime() + MinutTimeStamp * range[selectTime.value].value;
  console.log(currentRoomMessage.value);
  post(
    "/ws/post/msg",
    {
      roomID: toRaw(currentRoomMessage.value as any).roomID,
      senderID: [userInfo.value.userID],
      receiverID: [],
      msgType: "courseRecord",
      judgeDelete: 0,
      courseRecord: toRaw(PublishQuestionObj.value),
    },
    {
      header: { "content-type": "application/json" },
    }
  ).then((res) => {
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
