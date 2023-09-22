"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userStore = require("../../stores/userStore.js");
const utils_index_index = require("../../utils/index/index.js");
const hooks_toUrl = require("../../hooks/toUrl.js");
const api_request = require("../../api/request.js");
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
    const { getAllCourseMsg, getAllQuestion } = useUserStore;
    const IndexRefreshTrigger = common_vendor.ref(false);
    const handleRefreshIndexList = async () => {
      IndexRefreshTrigger.value = true;
      await getAllCourseMsg().then((res) => {
        IndexRefreshTrigger.value = false;
      });
    };
    const addClass = async () => {
      hooks_toUrl.to("/pagesSub/course/addCourse");
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
    const inClassRoom = common_vendor.ref();
    common_vendor.onLoad(async () => {
      const info = common_vendor.index.getStorageSync("USER_INFO");
      if (info) {
        userInfo.value = info;
      }
      await getAllCourseMsg();
      const currentTimeStamp = Date.now();
      let list = common_vendor.toRaw(courseList.value);
      list == null ? void 0 : list.forEach((course) => {
        if (course.room) {
          course.room.forEach((room) => {
            if (room.startTime && room.startTime <= currentTimeStamp && room.endTime >= currentTimeStamp) {
              inClassRoom.value = room;
            }
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(inClassRoom)
      }, common_vendor.unref(inClassRoom) ? {
        b: common_vendor.t(common_vendor.unref(inClassRoom) ? "\u60A8\u5F53\u524D\u6709\u6B63\u5728\u4E0A\u7684\u8BFE\uFF0C\u70B9\u51FB\u8DF3\u8F6C -> " : ""),
        c: common_vendor.o(($event) => {
          var _a, _b, _c;
          return common_vendor.unref(hooks_toUrl.to)(`/pagesSub/classroom/classroom?roomID=${(_a = common_vendor.unref(inClassRoom)) == null ? void 0 : _a.roomID}&name=${((_b = common_vendor.unref(inClassRoom)) == null ? void 0 : _b.detail) || "\u672A\u8BBE\u7F6E\u540D\u79F0"}&teacherID=${(_c = common_vendor.unref(inClassRoom)) == null ? void 0 : _c.teacherID}`);
        })
      } : {}, {
        d: common_vendor.o(selectIndexNav),
        e: common_vendor.p({
          ["select-options"]: common_vendor.unref(utils_index_index.indexSelectList),
          defaultOption: 1
        }),
        f: common_vendor.f(common_vendor.unref(courseList), (course, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => common_vendor.unref(hooks_toUrl.to)(`/pagesSub/course/course?index=${index}&title=${course.courseName}&courseID=${course.courseID}`), index),
            c: "83a5a03c-1-" + i0,
            d: common_vendor.p({
              teacherName: course == null ? void 0 : course.teaName,
              teachClass: course == null ? void 0 : course.class,
              title: course == null ? void 0 : course.courseName,
              ["teacher-avater"]: course == null ? void 0 : course.avatarURL
            })
          };
        }),
        g: common_vendor.unref(userInfo).role === "\u6559\u5E08"
      }, common_vendor.unref(userInfo).role === "\u6559\u5E08" ? {
        h: common_vendor.o(addClass),
        i: common_vendor.p({
          content: "\u6CA1\u6709\u8BFE\u7A0B\uFF1F\u7ACB\u5373\u6DFB\u52A0"
        })
      } : {}, {
        j: common_vendor.unref(IndexRefreshTrigger),
        k: common_vendor.o(handleRefreshIndexList)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "/Users/xlin/Desktop/mycode/\u65B0\u5C0F\u7A0B\u5E8F/answerTo/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
