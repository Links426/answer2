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
  const courseList = ref<Array<any>>([]);

  const currentQuestionData = ref();
  return { isBinding, userInfo, courseList, currentQuestionData };
});
