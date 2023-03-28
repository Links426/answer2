"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const mannerList = common_vendor.reactive([
      { id: 0, icon: "icon-yue", title: "\u6253\u8D4F\u7F50\u5934" },
      { id: 1, icon: "icon-paizhao", title: "\u62CD\u7167\u6708\u699C" },
      { id: 2, icon: "icon-chizi", title: "\u5F00\u53D1\u56E2\u961F" },
      { id: 3, icon: "icon-fangangaishan", title: "\u4FE1\u606F\u53CD\u9988" }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.f(common_vendor.unref(mannerList), (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: common_vendor.t(item.title),
            c: item.id
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d41d38da"], ["__file", "/Users/xlin/\u5B66\u4E60\u8D44\u65992/hellCat/HELLCAT_MARK2/src/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
