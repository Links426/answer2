"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_discoverImgStore = require("../../stores/discoverImgStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "discover",
  setup(__props) {
    const discoverStore = stores_discoverImgStore.discoverImgStore();
    const { discoverImgList } = common_vendor.storeToRefs(discoverStore);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(discoverImgList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: "url(" + item.src + ")"
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-36f2c107"], ["__file", "/Users/xlin/\u5B66\u4E60\u8D44\u65992/hellCat/HELLCAT_MARK2/src/pages/discover/discover.vue"]]);
wx.createPage(MiniProgramPage);
