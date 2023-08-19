import { get } from "@/api/request";
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

  const currentRoomMessage = ref();
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
  return {
    isBinding,
    userInfo,
    courseList,
    currentQuestionData,
    currentCourseMessage,
    currentRoomMessage,
    getAllCourseMsg,
  };
});
