"use strict";
const common_vendor = require("../../../common/vendor.js");
const stores_nekoListStore = require("../../../stores/nekoListStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index-image",
  setup(__props) {
    const nekoStore = stores_nekoListStore.nekoNameListStore();
    const { clickId, nekoNameList } = common_vendor.storeToRefs(nekoStore);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(nekoNameList)[common_vendor.unref(clickId)].nekoImgList, (item, i, i0) => {
          return {
            a: i,
            b: "url(" + item + ")"
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1de0b920"], ["__file", "/Users/xlin/\u5B66\u4E60\u8D44\u65992/hellCat/HELLCAT_MARK2/src/pages/index/components/index-image.vue"]]);
wx.createComponent(Component);
