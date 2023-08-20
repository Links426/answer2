"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userStore = require("../../stores/userStore.js");
const utils_index_index = require("../../utils/index/index.js");
const hooks_toUrl = require("../../hooks/toUrl.js");
const api_request = require("../../api/request.js");
const api_websocket = require("../../api/websocket.js");
require("../../config/config.js");
if (!Math) {
  (NavSelect + IndexCourseCard + NButton)();
}
const NavSelect = () => "../../components/nav-select.js";
const NButton = () => "../../components/n-button.js";
const IndexCourseCard = () => "./components/index-courseCard.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const useUserStore = stores_userStore.userStore();
    const { userInfo, courseList } = common_vendor.storeToRefs(useUserStore);
    const { getAllCourseMsg } = useUserStore;
    const addClass = async () => {
      hooks_toUrl.to("/pagesSub/course/addCourse");
    };
    const test = () => {
      console.log(1);
      common_vendor.index.login({
        success: (res) => {
          console.log(res);
        }
      });
    };
    const selectIndexNav = async (id) => {
      if (id === 1) {
        await api_request.get("/user/get/course", {
          params: {
            ID: userInfo.value.userID,
            Name: userInfo.value.userName,
            Role: userInfo.value.role === "\u5B66\u751F" ? "student" : " teacher"
          }
        }).then((res) => {
          console.log(res);
        });
      }
    };
    const testWs = () => {
      api_websocket.connectWs(111, 807077604).onMessage((res) => {
        console.log(res.data);
      });
    };
    const deleteWs = () => {
      api_request.Delete("/ws/delete/conn?roomID=482589151&ID=111");
    };
    common_vendor.onLoad(async () => {
      const info = common_vendor.index.getStorageSync("USER_INFO");
      if (info) {
        userInfo.value = info;
      }
      await getAllCourseMsg();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(selectIndexNav),
        b: common_vendor.p({
          ["select-options"]: common_vendor.unref(utils_index_index.indexSelectList),
          defaultOption: 1
        }),
        c: common_vendor.f(common_vendor.unref(courseList), (course, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => common_vendor.unref(hooks_toUrl.to)(`/pagesSub/course/course?index=${index}&title=${course.courseName}&courseID=${course.courseID}`), index),
            c: "83a5a03c-1-" + i0,
            d: common_vendor.p({
              teacherName: course == null ? void 0 : course.teaName,
              teachClass: course == null ? void 0 : course.academy,
              title: course == null ? void 0 : course.courseName,
              ["teacher-avater"]: course == null ? void 0 : course.avatarURL
            })
          };
        }),
        d: common_vendor.o(addClass),
        e: common_vendor.p({
          content: "\u6CA1\u6709\u8BFE\u7A0B\uFF1F\u7ACB\u5373\u6DFB\u52A0"
        }),
        f: common_vendor.o(testWs),
        g: common_vendor.p({
          content: "\u6D4B\u8BD5\u94FE\u63A5"
        }),
        h: common_vendor.o(deleteWs),
        i: common_vendor.p({
          content: "\u6D4B\u8BD5\u5220\u9664\u94FE\u63A5"
        }),
        j: common_vendor.o(test)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "/Users/xlin/Desktop/mycode/\u65B0\u5C0F\u7A0B\u5E8F/answerTo/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
