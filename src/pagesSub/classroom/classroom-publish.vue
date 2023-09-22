<template>
  <scroll-view overscroll="auto" class="bg-#F7F7F7">
    <div p-24px>
      <div w-full h-50px bg-white rounded-12rpx flex items-center>
        <picker
          mode="selector"
          :range="typeRange"
          :range-key="'key'"
          :value="selectType"
          @change="handleSelType"
        >
          <view class="picker">
            选择发布题目类型 {{ typeRange[selectType].key }}
          </view>
        </picker>
      </div>
    </div>
    <!-- 选择题 -->
    <div p-24px v-show="typeRange[selectType].key === '选择题'">
      <AInput
        :title="'题目名称'"
        :placeholder="'请输入题目名称'"
        v-model="PublishQuestionObj.title"
      />
      <div w-full mt-12px bg-white h-255px rounded-8px>
        <div>题目选项</div>

        <div>
          <div v-for="input in selTypeQuestionOptions" :key="input.key" flex>
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
        <picker
          mode="selector"
          :range="selTypeQuestionOptions"
          :range-key="'key'"
          :value="selectAnswer"
          @change="handleCorrectAnswer"
        >
          <view class="picker">
            选择正确答案: {{ selTypeQuestionOptions[selectAnswer].key }}
          </view>
        </picker>

        <button @click="classPublishQuestion('chose')">发布</button>
      </div>
    </div>
    <!-- 简答题 -->
    <div p-24px v-show="typeRange[selectType].key === '填空题'">
      <AInput
        :title="'题目名称'"
        :placeholder="'请输入题目名称'"
        v-model="PublishCommentObj.title"
      />
      <div w-full mt-12px h-255px rounded-8px>
        <div mb-12px>上传图片(可选)</div>
        <button
          class="mb-60rpx avatarButton"
          :style="{
            backgroundImage:
              'url(' + PublishCommentObj.options.photo[0].value + ')',
          }"
          @click="onChooseImg"
        >
          <i class="iconfont icon-paizhao"></i>
        </button>

        <button @click="classPublishQuestion('photo')">发布</button>
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
const { currentRoomMessage, userInfo, transportRoomID } =
  storeToRefs(useUserStore);
const { getAllCourseMsg, getAllQuestion } = useUserStore;

const MinutTimeStamp = 60000;
const selectTime = ref(0);
const selectAnswer = ref(0);
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
const typeRange = [
  {
    key: "选择题",
    value: "chose",
  },
  {
    key: "填空题",
    value: "fill",
  },
];
const selTypeQuestionOptions = ref([
  { key: "A", value: "" },
  { key: "B", value: "" },
  { key: "C", value: "" },
  { key: "D", value: "" },
]);
const PublishQuestionObj = ref({
  id: uuid(), // Ajs838198d1
  title: "",
  answer: "A",
  startTime: 0,
  endTime: 0, // 1691289108136

  options: {
    chose: toRaw(selTypeQuestionOptions.value),
  },
});
const PublishCommentObj = ref({
  id: uuid(), // Ajs838198d1
  title: "",

  startTime: 0,
  endTime: 0, // 1691289108136

  options: {
    photo: [
      {
        key: "first URL",
        value: "URL",
      },
    ],
  },
});
const selectType = ref(0);
const handleSelectTime = (e: { target: { value: number } }) => {
  selectTime.value = e.target.value;
};
const handleCorrectAnswer = (e: { target: { value: number } }) => {
  selectAnswer.value = e.target.value;
};
const handleSelType = (e) => {
  selectType.value = e.target.value;
};

const onChooseImg = (e: { detail: any }) => {
  uni.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    success: (res) => {
      console.log(res.tempFilePaths[0]);
      uni.uploadFile({
        url: "http://193.112.177.42:32323/Upload",
        filePath: res.tempFilePaths[0],
        name: "image",
        header: { "Content-Type": "multipart/form-data" },
        success: (res: any) => {
          PublishCommentObj.value.options.photo[0].value = JSON.parse(
            res.data
          ).data.image_url;
          console.log(PublishCommentObj.value.options.photo[0].value);
        },
      });
    },
  });
};
const submitQustionReq = (reqObj: any) => {
  post(
    "/ws/post/msg",
    {
      roomID: currentRoomMessage.value.roomID,
      senderID: [userInfo.value.userID],
      receiverID: [],
      msgType: "courseRecord",
      judgeDelete: 0,
      courseRecord: reqObj,
    },
    {
      header: { "content-type": "application/json" },
    }
  ).then((res) => {
    if (res.code === 200) {
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
const classPublishQuestion = (type: string) => {
  if (type === "chose") {
    PublishQuestionObj.value.startTime = new Date().getTime();
    PublishQuestionObj.value.endTime =
      new Date().getTime() + MinutTimeStamp * range[selectTime.value].value;
    PublishQuestionObj.value.answer = toRaw(selTypeQuestionOptions.value)[
      selectAnswer.value
    ].key;
    submitQustionReq(toRaw(PublishQuestionObj.value));
  } else if (type === "photo") {
    PublishCommentObj.value.startTime = new Date().getTime();
    submitQustionReq(toRaw(PublishCommentObj.value));
  }
};
</script>

<style scoped>
.avatarButton {
  width: 200rpx;
  height: 200rpx;
  border-radius: 15rpx;
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #c9cdd4;
  background-size: contain;
}
</style>
