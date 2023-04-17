"use strict";
const common_vendor = require("../../common/vendor.js");
const api_users_login = require("../../api/users/login.js");
const api_request = require("../../api/request.js");
require("../../config/config.js");
if (!Math) {
  (MineCard + MineSetting)();
}
const MineCard = () => "./components/mine-card.js";
const MineSetting = () => "./components/mine-setting.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const test = () => {
      api_users_login.getUserCode().then((res) => console.log(res));
      api_request.get("/login", { code: "0e1dVS0w3Up0u03Z8Q3w3itu6I2dVS0M" });
      console.log(common_vendor.index.getStorageSync("USER-TOKEN"));
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["mb-56rpx"]: true,
          name: "\u672A\u77E5\u7528\u6237",
          ["class-name"]: "\u672A\u77E5\u73ED\u7EA7",
          ["avater-url"]: "https://p.ipic.vip/v0144p.jpeg"
        }),
        b: common_vendor.p({
          ["icon-name"]: "icon-shezhi",
          content: "\u8BBE\u7F6E",
          ["mb-24rpx"]: true
        }),
        c: common_vendor.o(test)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d41d38da"], ["__file", "/Users/xlin/Desktop/mycode/\u65B0\u5C0F\u7A0B\u5E8F/answerTo/src/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
