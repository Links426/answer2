"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_courseStore = require("../../stores/courseStore.js");
const stores_userStore = require("../../stores/userStore.js");
const utils_index_index = require("../../utils/index/index.js");
const hooks_toUrl = require("../../hooks/toUrl.js");
if (!Math) {
  (NavSelect + NButton)();
}
const NavSelect = () => "../../components/nav-select.js";
const NButton = () => "../../components/n-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const useCourseStore = stores_courseStore.courseStore();
    common_vendor.storeToRefs(useCourseStore);
    const useUserStore = stores_userStore.userStore();
    const { userInfo } = common_vendor.storeToRefs(useUserStore);
    const addClass = async () => {
      return hooks_toUrl.to("/pagesSub/course/addCourse");
    };
    common_vendor.onLoad(() => {
      const info = common_vendor.index.getStorageSync("USER_INFO");
      if (info) {
        userInfo.value = info;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["select-options"]: common_vendor.unref(utils_index_index.indexSelectList),
          defaultOption: 1
        }),
        b: common_vendor.o(addClass),
        c: common_vendor.p({
          content: "\u6CA1\u6709\u8BFE\u7A0B\uFF1F\u7ACB\u5373\u6DFB\u52A0"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "/Users/xlin/Desktop/mycode/\u65B0\u5C0F\u7A0B\u5E8F/answerTo/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
