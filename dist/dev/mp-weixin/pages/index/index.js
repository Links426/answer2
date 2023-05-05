"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_courseStore = require("../../stores/courseStore.js");
const utils_index_index = require("../../utils/index/index.js");
const hooks_toUrl = require("../../hooks/toUrl.js");
if (!Math) {
  (NavSelect + CourseCard)();
}
const NavSelect = () => "../../components/nav-select.js";
const CourseCard = () => "./components/index-courseCard.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const useCourseStore = stores_courseStore.courseStore();
    const { courseCardList } = common_vendor.storeToRefs(useCourseStore);
    const toCoursePage = (title, id, teachClass) => {
      hooks_toUrl.to(`/pagesSub/course/course?id=${id}&title=${title}&teacherClass=${teachClass}`);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["select-options"]: common_vendor.unref(utils_index_index.indexSelectList),
          defaultOption: 1
        }),
        b: common_vendor.f(common_vendor.unref(courseCardList), (card, k0, i0) => {
          return {
            a: common_vendor.o(($event) => toCoursePage(card.title, card.id, card.teachClass), card.id),
            b: "83a5a03c-1-" + i0,
            c: common_vendor.p({
              title: card.title,
              teachClass: card.teachClass,
              ["teacher-name"]: card.teacherName,
              ["teacher-avater"]: card.teacherAvater
            }),
            d: card.id
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "/Users/xlin/Desktop/mycode/\u65B0\u5C0F\u7A0B\u5E8F/answerTo/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
