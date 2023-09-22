import { get, post } from "@/api/request";
import { defineStore } from "pinia";

export interface IUserInfo {
  academy: string;
  avatarURL: string;
  class: string;
  major: string;
  nickName: string;
  openID: string;
  phone: string;
  role: string;
  userID: number | string;
  userName: string;
}

export const userStore = defineStore("user", () => {
  const isBinding = ref(false);
  const userInfo = ref<IUserInfo>({
    academy: "",
    avatarURL: "",
    class: "",
    major: "",
    nickName: "",
    openID: "",
    phone: "",
    role: "",
    userID: "",
    userName: "",
  });
  // 课程内容
  const courseList = ref<Array<any>>([]);

  const currentRoomMessage = ref<{
    roomID: string | number;
    teacherID: string | number;
  }>({ roomID: "", teacherID: "" });
  const currentCourseMessage = ref();

  const currentQuestionData = ref();
  const getAllCourseMsg = async () => {
    const { data } = await get("/user/get/course", {
      ID: userInfo.value.userID,
      name: userInfo.value.userName,
      role: userInfo.value.role === "学生" ? "student" : " teacher",
    });
    courseList.value = data?.data?.course;
  };

  const transportRoomID = ref();
  const classQuestionList = ref([]);

  const getAllQuestion = (
    roomID: number | string,
    teacherID: number | string
  ) => {
    return post(
      "/user/get/course/task",
      {
        roomID: currentRoomMessage?.value?.roomID || roomID,
        sendID: currentRoomMessage?.value?.teacherID || teacherID,
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
  };
  return {
    isBinding,
    userInfo,
    courseList,
    currentQuestionData,
    currentCourseMessage,
    currentRoomMessage,
    getAllCourseMsg,
    transportRoomID,
    classQuestionList,
    getAllQuestion,
  };
});
