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
        <button @click="classPublishQuestion">发布</button>
      </div>
    </div>
  </scroll-view>
</template>
<script setup lang="ts">
import { post } from "@/api/request";
import AInput from "../course/components/addCourse-input.vue";

const PublishQuestionObj = ref({
  id: "",
  title: "asd",
  answer: "A",
  options: [
    { key: "A", value: "123" },
    { key: "B", value: "123" },
    { key: "C", value: "123" },
    { key: "D", value: "213" },
  ],
});
const test = () => {
  console.log(JSON.stringify(toRaw(PublishQuestionObj.value.options)));
};
const classPublishQuestion = () => {
  post(
    "/ws/post/msg",
    {
      roomID: "1059437675",
      senderID: ["12100000001"],
      receiverID: [],
      msgType: "courseRecord",
      chatMsg: "nostrud nisi ut ex",
      judgeDelete: 0,
      courseRecord: {
        id: "90",
        title: "这是一道题123213123",
        answer: "officia dolore",
        options: [
          {
            key: "A",
            value: "问题A111",
          },
          {
            key: "B",
            value: "问题B111",
          },
          {
            key: "C",
            value: "问题C111",
          },
          {
            key: "D",
            value: "问题D111",
          },
        ],
      },
    },
    {
      header: { "content-type": "application/json" },
    }
  );
};
</script>

<style scoped></style>
