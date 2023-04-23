"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_toUrl = require("../../hooks/toUrl.js");
const stores_userStore = require("../../stores/userStore.js");
if (!Math) {
  (MineCard + Setting)();
}
const MineCard = () => "./components/mine-card.js";
const Setting = () => "./components/mine-setting.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const useUserStore = stores_userStore.userStore();
    const { userInfo, isLogin } = common_vendor.storeToRefs(useUserStore);
    const settingList = [
      { id: 0, content: "\u8BBE\u7F6E", icon: "icon-shezhi", url: "/pagesSub/setting/setting" },
      { id: 1, content: "\u8BBE\u7F6E", icon: "icon-shezhi", url: "/pagesSub/setting/setting" },
      { id: 2, content: "\u8BBE\u7F6E", icon: "icon-shezhi", url: "/pagesSub/setting/setting" },
      { id: 3, content: "\u8BBE\u7F6E", icon: "icon-shezhi", url: "/pagesSub/setting/setting" }
    ];
    common_vendor.onLoad(() => {
      const info = common_vendor.index.getStorageSync("USER_INFO");
      if (info && isLogin) {
        userInfo.value = info;
        isLogin.value = true;
      }
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: common_vendor.p({
          ["mb-56rpx"]: true,
          name: (_a = common_vendor.unref(userInfo)) == null ? void 0 : _a.nickName,
          ["class-name"]: "\u672A\u77E5\u73ED\u7EA7",
          ["avater-url"]: (_b = common_vendor.unref(userInfo)) == null ? void 0 : _b.avatarUrl
        }),
        b: common_vendor.f(settingList, (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(($event) => common_vendor.unref(hooks_toUrl.to)(item.url), item.id),
            c: "d41d38da-1-" + i0,
            d: common_vendor.p({
              ["icon-name"]: item.icon,
              content: item.content,
              ["mb-16rpx"]: true
            })
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d41d38da"], ["__file", "/Users/xlin/Desktop/mycode/\u65B0\u5C0F\u7A0B\u5E8F/answerTo/src/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
